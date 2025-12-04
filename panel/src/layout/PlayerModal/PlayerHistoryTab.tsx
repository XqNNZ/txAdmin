import { cn } from "@/lib/utils";
import { tsToLocaleDateTimeString } from "@/lib/dateTime";
import { PlayerHistoryItem } from "@shared/playerApiTypes";
import InlineCode from "@/components/InlineCode";
import { useOpenActionModal } from "@/hooks/actionModal";
import ModalCentralMessage from "@/components/ModalCentralMessage";


type HistoryItemProps = {
    action: PlayerHistoryItem,
    serverTime: number,
    modalOpener: (actionId: string) => void,
}

function HistoryItem({ action, serverTime, modalOpener }: HistoryItemProps) {
    // Check if action is older than 3 months (90 days = 7,776,000 seconds)
    const threeMonthsAgo = serverTime - (90 * 24 * 60 * 60);
    const isOlderThan3Months = action.ts < threeMonthsAgo;

    let footerNote, borderColorClass, actionMessage;
    if (action.type === 'ban') {
        borderColorClass = isOlderThan3Months ? 'border-muted' : 'border-destructive';
        actionMessage = `BANNED by ${action.author}`;
    } else if (action.type === 'warn') {
        borderColorClass = isOlderThan3Months ? 'border-muted' : 'border-warning';
        actionMessage = `WARNED by ${action.author}`;
    } else if (action.type === 'kick') {
        borderColorClass = isOlderThan3Months ? 'border-muted' : 'border-info';
        actionMessage = `KICKED by ${action.author}`;
    } else if (action.type === 'occurrence') {
        borderColorClass = isOlderThan3Months ? 'border-muted' : 'border-muted-foreground';
        actionMessage = `OCCURRENCE by ${action.author}`;
    }
    if (action.revokedBy) {
        borderColorClass = '';
        const revocationDate = tsToLocaleDateTimeString(action.revokedAt ?? 0, 'medium', 'medium');
        footerNote = `Revoked by ${action.revokedBy}${action.revokedReason ? ` for "${action.revokedReason}"` : ''} on ${revocationDate}.`;
    } else if (typeof action.exp === 'number') {
        const expirationDate = tsToLocaleDateTimeString(action.exp, 'medium', 'short');
        footerNote = (action.exp < serverTime) ? `Expired on ${expirationDate}.` : `Expires in ${expirationDate}.`;
    }

    return (
        <div
            onClick={() => { modalOpener(action.id) }}
            className={cn(
                'pl-2 border-l-4 hover:bg-muted rounded-r-sm bg-muted/30 cursor-pointer',
                borderColorClass,
                isOlderThan3Months && 'opacity-60 grayscale'
            )}
        >
            <div className="flex w-full justify-between">
                <strong className={cn(
                    'text-sm',
                    isOlderThan3Months ? 'text-muted-foreground' : 'text-foreground'
                )}>{actionMessage}</strong>
                <small className="text-right text-2xs space-x-1">
                    <InlineCode className="tracking-widest">{action.id}</InlineCode>
                    <span
                        className="opacity-75 cursor-help"
                        title={tsToLocaleDateTimeString(action.ts, 'long', 'long')}
                    >
                        {tsToLocaleDateTimeString(action.ts, 'medium', 'short')}
                    </span>
                    {isOlderThan3Months && (
                        <span className="text-muted-foreground italic">(3+ months old)</span>
                    )}
                </small>
            </div>
            <span className={cn(
                'text-sm',
                isOlderThan3Months && 'text-muted-foreground'
            )}>{action.reason.length > 50 ? `${action.reason.substring(0, 50)}...` : action.reason}</span>
            {footerNote && <small className="block text-xs opacity-75">{footerNote}</small>}
        </div>
    );
}


type PlayerHistoryTabProps = {
    actionHistory: PlayerHistoryItem[],
    serverTime: number,
    refreshModalData: () => void,
}

export default function PlayerHistoryTab({ actionHistory, serverTime, refreshModalData }: PlayerHistoryTabProps) {
    const openActionModal = useOpenActionModal();

    if (!actionHistory.length) {
        return <ModalCentralMessage>
            No bans/warns found.
        </ModalCentralMessage>;
    }

    const doOpenActionModal = (actionId: string) => {
        openActionModal(actionId);
    }

    const reversedActionHistory = [...actionHistory].reverse();
    return <div className="flex flex-col gap-1 p-1">
        {reversedActionHistory.map((action) => (
            <HistoryItem
                key={action.id}
                action={action}
                serverTime={serverTime}
                modalOpener={doOpenActionModal}
            />
        ))}
    </div>;
}
