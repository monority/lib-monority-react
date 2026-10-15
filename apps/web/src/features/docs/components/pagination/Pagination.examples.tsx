import { Pagination } from '@monority/ui/pagination'
import { useState } from 'react'

export function PaginationBasicExample() {
    const [page, setPage] = useState(2)

    return <Pagination page={page} totalPages={6} onPageChange={setPage} />
}

export function PaginationInteractiveExample() {
    const [page, setPage] = useState(3)

    return <Pagination page={page} totalPages={10} onPageChange={setPage} />
}

export function PaginationFewPagesExample() {
    const [page, setPage] = useState(1)

    return <Pagination page={page} totalPages={3} onPageChange={setPage} />
}

export function PaginationManyPagesExample() {
    const [page, setPage] = useState(15)

    return <Pagination page={page} totalPages={50} onPageChange={setPage} />
}

export function PaginationCompoundExample() {
    return (
        <Pagination>
            <Pagination.Content>
                <Pagination.Item>
                    <Pagination.Previous href="#prev" />
                </Pagination.Item>
                <Pagination.Item>
                    <Pagination.Link href="#1">1</Pagination.Link>
                </Pagination.Item>
                <Pagination.Item>
                    <Pagination.Link href="#2" isActive>
                        2
                    </Pagination.Link>
                </Pagination.Item>
                <Pagination.Item>
                    <Pagination.Link href="#3">3</Pagination.Link>
                </Pagination.Item>
                <Pagination.Item>
                    <Pagination.Ellipsis />
                </Pagination.Item>
                <Pagination.Item>
                    <Pagination.Next href="#next" />
                </Pagination.Item>
            </Pagination.Content>
        </Pagination>
    )
}
