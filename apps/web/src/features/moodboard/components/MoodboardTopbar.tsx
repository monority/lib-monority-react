import { Topbar } from '@monority/ui/topbar'

export function MoodboardTopbar() {
    return (
        <Topbar role="group" aria-label="Product navigation">
            <Topbar.Brand>
                <Topbar.BrandMark>M</Topbar.BrandMark>
                <span>MONORITY</span>
            </Topbar.Brand>
            <Topbar.Nav aria-label="Compact navigation">
                <Topbar.Link href="#overview" active>
                    Overview
                </Topbar.Link>
                <Topbar.Link href="#activity">Activity</Topbar.Link>
                <Topbar.Link href="#settings">Settings</Topbar.Link>
            </Topbar.Nav>
            <Topbar.Status tone="success">All systems nominal</Topbar.Status>
        </Topbar>
    )
}
