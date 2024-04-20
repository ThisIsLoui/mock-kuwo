import ReactPaginate from 'react-paginate'
import styles from './MyPaginate.module.scss'

export default function MyPaginate({
  pageCount,
  currentPage,
  setCurrentPage,
}: {
  pageCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
}) {
  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      pageClassName={styles['page-item']}
      previousClassName={styles['page-item']}
      nextClassName={styles['page-item']}
      breakLabel="..."
      breakClassName={styles['page-item']}
      breakLinkClassName={styles['break']}
      pageCount={pageCount || 0}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={({ selected }) => setCurrentPage(selected + 1)}
      forcePage={currentPage - 1 || 0}
      containerClassName={styles['pagination']}
      activeClassName={styles['active']}
    />
  )
}
