import { Badge } from '@monority/ui/badge'
import { Button } from '@monority/ui/button'
import { FilterBar } from '@monority/ui/filter-bar'
import { Input } from '@monority/ui/input'
import { Select } from '@monority/ui/select'

export function FilterBarBasicExample() {
    return (
        <FilterBar>
            <FilterBar.Main>
                <FilterBar.Chips>
                    <FilterBar.Chip active>Status: Live</FilterBar.Chip>
                    <FilterBar.Chip>Plan: Pro</FilterBar.Chip>
                    <FilterBar.Chip>Owner: Design</FilterBar.Chip>
                </FilterBar.Chips>
            </FilterBar.Main>
            <FilterBar.Meta>
                <span>24 results</span>
            </FilterBar.Meta>
        </FilterBar>
    )
}

export function FilterBarWithControlsExample() {
    return (
        <FilterBar>
            <FilterBar.Main>
                <FilterBar.Leading>
                    <Input placeholder="Search components..." />
                </FilterBar.Leading>
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
            </FilterBar.Main>
            <FilterBar.Meta>
                <span>Showing 18 of 64</span>
            </FilterBar.Meta>
        </FilterBar>
    )
}

export function FilterBarWithResetExample() {
    return (
        <FilterBar>
            <FilterBar.Main>
                <FilterBar.Chips>
                    <Badge>3 active</Badge>
                    <FilterBar.Chip active>Category: Analytics</FilterBar.Chip>
                    <FilterBar.Chip>Region: Europe</FilterBar.Chip>
                    <FilterBar.Chip>Updated: 30 days</FilterBar.Chip>
                </FilterBar.Chips>
            </FilterBar.Main>
            <FilterBar.Meta>
                <Button variant="ghost" size="sm">
                    Reset
                </Button>
            </FilterBar.Meta>
        </FilterBar>
    )
}
