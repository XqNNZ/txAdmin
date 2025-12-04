import { Link, Route, Switch } from "wouter";
import Login from "../pages/auth/Login";
import CfxreCallback from "../pages/auth/CfxreCallback";
import AddMasterPin from "../pages/auth/AddMasterPin";
import AddMasterCallback from "../pages/auth/AddMasterCallback";
import { Card } from "../components/ui/card";
import { LogoFullSquareGreen } from "@/components/Logos";
import { useTheme } from "@/hooks/theme";
import { handleExternalLinkClick } from "@/lib/utils";


export default function AuthShell() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center m-4 w-full xs:w-[25rem] min-w-[20rem]">
                <LogoFullSquareGreen className="h-12 mx-auto" />

                <Card className="min-h-64 mt-8 mb-4 p-4 flex items-center justify-center">
                    <Switch>
                        <Route path="/login"><Login /></Route>
                        <Route path="/login/callback"><CfxreCallback /></Route>
                        <Route path="/addMaster/pin"><AddMasterPin /></Route>
                        <Route path="/addMaster/callback"><AddMasterCallback /></Route>
                        <Route path="/:fullPath*">
                            <small>redirecting to the login page...</small>
                        </Route>
                    </Switch>
                </Card>

                <div>
                    <small className="text-muted-foreground text-sm font-light">
                        tx: <strong>v{window.txConsts.txaVersion}</strong>
                        &nbsp;|
                        fx: <strong>b{window.txConsts.fxsVersion}</strong>
                    </small>
                </div>
            </div>
        </div>
    );
}
