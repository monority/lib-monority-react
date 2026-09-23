import { Badge } from '@monority/ui/badge'
import { Button } from '@monority/ui/button'
import { FilterBar } from '@monority/ui/filter-bar'
import { Input } from '@monority/ui/input'
import { Select } from '@monority/ui/select'

export function FilterBarBasicExample() {
    return (
        <FilterBar>
            <div className="mr-filter-bar__main">
                <div className="mr-filter-bar__chips">
                    <span className="mr-filter-bar__chip">Status: Live</span>
                    <span className="mr-filter-bar__chip">Plan: Pro</span>
                    <span className="mr-filter-bar__chip">Owner: Design</span>
                </div>
            </div>
            <div className="mr-filter-bar__meta">
                <span>24 results</span>
            </div>
        </FilterBar>
    )
}

export function FilterBarWithControlsExample() {
    return (
        <FilterBar>
            <div className="mr-filter-bar__main">
                <div className="mr-filter-bar__leading">
                    <Input placeholder="Search components..." />
                </div>
                <Select aria-label="Status filter" defaultValue="all">
                    <option value="all">All statuses</option>
                    <option value="stable">Stable</option>
                    <option value="beta">Beta</option>
                    <option value="deprecated">Deprecated</option>
                </Select>
                <Select aria-label="Platform filter" defaultValue="all">
                    <option value="all">All platforms</option>
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="email">Email</option>
                </Select>
                <Button variant="secondary" size="sm">
                    Apply
                </Button>
            </div>
            <div className="mr-filter-bar__meta">
                <span>Showing 18 of 64</span>
            </div>
        </FilterBar>
    )
}

export function FilterBarWithResetExample() {
    return (
        <FilterBar>
            <div className="mr-filter-bar__main">
                <div className="mr-filter-bar__chips">
                    <Badge>3 active</Badge>
                    <span className="mr-filter-bar__chip">Category: Analytics</span>
                    <span className="mr-filter-bar__chip">Region: Europe</span>
                    <span className="mr-filter-bar__chip">Updated: 30 days</span>
                </div>
            </div>
            <div className="mr-filter-bar__meta">
                <Button variant="ghost" size="sm">
                    Reset
                </Button>
            </div>
        </FilterBar>
    )
}
