import { cn, handleExternalLinkClick } from '@/lib/utils';
import ServerMenu from './ServerMenu';
import ServerControls from './ServerControls';
import ServerStatus from './ServerStatus';
import ServerSchedule from './ServerSchedule';


type ServerSidebarProps = {
    isSheet?: boolean;
};
export function ServerSidebar({ isSheet }: ServerSidebarProps) {
    return (
        <aside
            className={cn(
                'flex flex-col gap-4 z-10',
                isSheet ? 'mr-4 pl-2' : 'tx-sidebar hidden lg:flex',
            )}
        >
            <div className={cn(
                !isSheet && 'rounded-xl border border-border bg-card text-card-foreground shadow-sm p-4',
                // !isSheet && 'rounded-xl borderx border-border bg-cardx text-card-foreground shadow-sm px-2',
            )}>
                <ServerMenu />
            </div>
            <hr className={isSheet ? 'block' : 'hidden'} />
            <div className={cn(
                !isSheet && 'rounded-xl border border-border bg-card text-card-foreground shadow-sm p-4',
                // !isSheet && 'rounded-xl borderx border-border bg-cardx text-card-foreground shadow-sm px-2',
                'flex flex-col gap-4'
            )}>
                {/* <h2 className="text-lg font-semibold tracking-tight overflow-hidden text-ellipsis">
                    Controls & Status
                </h2> */}
                <ServerControls />
                <ServerStatus />
                <ServerSchedule />
            </div>
            <hr className={isSheet ? 'block' : 'hidden'} />

            {window.txConsts.isWebInterface ? (
                <div className='flex flex-col items-center justify-center gap-1 text-sm font-light opacity-85 hover:opacity-100'>
                    <span className={cn(
                        'text-muted-foreground',
                        window.txConsts.txaVersion.includes('-') && 'text-destructive-inline font-semibold',
                    )}>
                        tx: <strong>v{window.txConsts.txaVersion}</strong>
                        &nbsp;|
                        fx: <strong>b{window.txConsts.fxsVersion}</strong>
                    </span>
                    <a
                        target="_blank"
                        className='text-muted-foreground hover:text-accent'
                    >
                        &copy; 2021-{(new Date).getUTCFullYear()} BeehiveRP
                    </a>
                </div>
            ) : null}
        </aside>
    );
}
