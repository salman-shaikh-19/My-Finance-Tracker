
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
// import SearchBar from "./SearchBar";
import CustomInfiniteScroll from "./CustomInfiniteScroll";
import ReactPaginate from "react-paginate";
import { exportToExcel } from "../../../utils/exportTo";
import _, { debounce } from "lodash";
import { FaArrowUp, FaSpinner } from "react-icons/fa";
import { BsArrowDown, BsArrowUp, BsFileExcel } from "react-icons/bs";


function CustomCommonTable(
    {
        tableData,
        tableDefaultColumns,
        perPageListArray = [2, 5, 10, 25, 100],
        Theme = 'dark',
        emptyMessage = "No data found",
        loading = false,
        sorting,
        pagination,
        globalFilter,
        columnFilters,
        setSorting,
        setPagination,
        setGlobalFilter,
        setColumnFilters,
        infiteScrollTargetId = "",
        //is i want or not that feature
        isPaginationEnabled = true,
        isPerPageEnabled = true,
        isSortingEnabled = true,
        isGlobalSearchEnabled = false,
        isColumnFilterEnabled = false,
        isExcelExportAll = false,
        isExcelExportCurrentPage = false,
        isExcelExportFiletered = false,
        exportFileName = "Export-Data"
    }
) {
    const memoData = useMemo(() => tableData, [tableData]);
    const memoColumns = useMemo(() => tableDefaultColumns, [tableDefaultColumns]);
    const table = useReactTable({
        data: memoData,
        columns: memoColumns,
        state: {
            ...(isSortingEnabled && sorting && { sorting }),
            ...(isPaginationEnabled && pagination && { pagination }),
            ...(isGlobalSearchEnabled && globalFilter && { globalFilter }),
            ...(isColumnFilterEnabled && columnFilters && { columnFilters }),
        },
        ...(isSortingEnabled && setSorting && { onSortingChange: setSorting }),
        ...(isPaginationEnabled && setPagination && { onPaginationChange: setPagination }),
        ...(isGlobalSearchEnabled && setGlobalFilter && { onGlobalFilterChange: setGlobalFilter }),
        ...(isColumnFilterEnabled && setColumnFilters && { onColumnFiltersChange: setColumnFilters }),

        getCoreRowModel: getCoreRowModel(),
        ...(isSortingEnabled && { getSortedRowModel: getSortedRowModel() }),
        ...(isPaginationEnabled && { getPaginationRowModel: getPaginationRowModel() }),
        ...(isGlobalSearchEnabled || isColumnFilterEnabled ? { getFilteredRowModel: getFilteredRowModel() } : {}),
        globalFilterFn: isGlobalSearchEnabled ? 'includesString' : undefined
    });

    // helper function to get only table data from visible columns
    const getVisibleTableData = (rows) => {
        return rows.map((row,index) => {
            const rowData = {};
            //   rowData['#'] = index + 1; 
            row.getVisibleCells().forEach(cell => {
                const colId = cell.column.id;
                 const colHeader = cell.column.columnDef.header; //column name of table
                // skip action column in export
                 if (!["action", "picture", "rowno","avatar"].includes(colId.toLowerCase())) {
                    rowData[colHeader] = cell.getValue();
                } // getValue(): returns rendered data
            });
            return rowData;
        });
    };
    //export all data
    
    const handleExportAll = useCallback(debounce( async() => {
        const allRows = table.getCoreRowModel().rows; //all rows ,ignores pagination
        const visibleData = getVisibleTableData(allRows);
        
       await exportToExcel(visibleData, `${exportFileName}-all-data`);
    },2000)
    ,    [table, exportFileName]);// 2 seconds delay


    //current page data like 1st pagination data
    const handleExportCurrentPage = useCallback( debounce( async() => {
        const currentPageRows = table.getPaginationRowModel().rows;//not ignores paginate here, active page data only
        const visibleData = getVisibleTableData(currentPageRows);
        await exportToExcel(visibleData, `${exportFileName}-current-page-data`);
    },2000)
    ,    [table, exportFileName]);
    //filtered data
    const handleExportFiltered = useCallback(debounce(async() => {
        const filteredRows = table.getFilteredRowModel().rows;
        const visibleData = getVisibleTableData(filteredRows);
        await exportToExcel(visibleData, `${exportFileName}-filtered-data`)
    },2000),
        [table, exportFileName] //created only on conditon if table or exportt filename changed
);
    const renderTable = (rows) => (
        <div className="table-responsive  ">
            <table className="table table-bordered table-hover ">
                <thead >
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}
                                    onClick={isSortingEnabled ? header.column.getToggleSortingHandler() : undefined}
                                    className={`text-center ${Theme === 'dark' ? 'theme-dark' : 'text-bg-dark'}`}
                                >
                                    {(
                                        <>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {isSortingEnabled &&
                                                (
                                                    {
                                                        asc: <BsArrowUp />,
                                                        desc: <BsArrowDown />
                                                    }
                                                )[header.column.getIsSorted()] || null}
                                        </>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody >

                    {loading ? (

                        <tr >
                            <td colSpan={tableDefaultColumns.length} className={`text-center py-5 ${Theme === 'dark' ? 'theme-dark' : 'text-bg-light'}`}>
                                <FaSpinner className="animate-spin" size="2x" />
                            </td>
                        </tr>

                    ) :
                        rows.length === 0 ? (

                            <tr className="">
                                <td colSpan={tableDefaultColumns.length} className={`text-center ${Theme === 'dark' ? 'theme-dark' : 'text-bg-light'}`}>
                                    {emptyMessage}
                                </td>
                            </tr>

                        ) : (

                            rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className={`${Theme === 'dark' ? 'theme-dark' : 'text-bg-light'}`}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                    ))}
                                </tr>
                            ))


                        )}
                </tbody>
            </table>
        </div>
    );


    return (
        <>
            {/* {isGlobalSearchEnabled && (
              <SearchBar onChangeFuc={val => setGlobalFilter(val)} />
        )} */}
            <div className="d-flex flex-wrap align-items-center pb-1 gap-2">
                {isPaginationEnabled && isPerPageEnabled && (
                    <div className="" style={{ maxWidth: "77px" }}>
                        <select value={table.getState().pagination.pageSize}
                            onChange={(e) => table.setPageSize(Number(e.target.value))}

                            className={`${Theme === 'dark' ? 'theme-dark' : 'text-bg-light'} form-select form-select-sm`}
                        >
                            {perPageListArray.map(pageSize => (
                                <option key={pageSize} value={pageSize} >{pageSize}</option>
                            ))}
                        </select>
                    </div>)}

                <div className=" ms-auto d-flex flex-wrap align-items-center gap-0">
                    <span className="fw-bold">Exports:</span>
                    {isExcelExportAll && (<button className={`ms-1 btn btn-outline-success btn-sm`} title="Export all data to Excel"  onClick={handleExportAll}><BsFileExcel /> All</button>)}
                    {isExcelExportFiletered && (<button className={`ms-1 btn btn-outline-success btn-sm`} title="Export filtered data to excel" onClick={handleExportFiltered}><BsFileExcel />Filtered</button>)}
                    {isExcelExportCurrentPage && (<button className={`ms-1 btn btn-outline-success btn-sm`} title="Export current page data to excel" onClick={handleExportCurrentPage}><BsFileExcel /> Page</button>)}
                </div>
            </div>
            {isPaginationEnabled ? (

                renderTable(table.getRowModel().rows)

            ) : (
                <CustomInfiniteScroll
                    data={table.getFilteredRowModel().rows}
                    pageSize={5}
                    scrollTargetId={infiteScrollTargetId}
                    isTable={true}
                >

                    {(items) => renderTable(items)}

                </CustomInfiniteScroll>
            )}



            {
                isPaginationEnabled && (

                    <div className=" d-flex ">
                        {/* <button className={`btn btn-outline-${Theme == 'dark' ? 'custom-alt' : 'custom'} btn-sm m-3`} onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                        </button> */}
                        {/* <button className={`btn btn-outline-${Theme == 'dark' ? 'custom' : 'custom-alt'} btn-sm`} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button> */}
                        <div className="mt-3 ">

                            <ReactPaginate
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                pageCount={table.getPageCount()}
                                forcePage={table.getState().pagination.pageIndex}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={(event) => table.setPageIndex(event.selected)}

                                containerClassName="pagination"

                                // page numbers
                                pageClassName={`m-1`}
                                pageLinkClassName={`btn btn-sm m-1 btn-outline-${Theme === 'dark' ? 'custom-alt' : 'custom'}`}

                                // previuos button
                                previousClassName="m-1"
                                previousLinkClassName={`btn btn-sm m-1 btn-outline-${Theme === 'dark' ? 'custom-alt' : 'custom'}`}

                                // next button
                                nextClassName="m-1"
                                nextLinkClassName={`btn btn-sm m-1 btn-outline-${Theme === 'dark' ? 'custom-alt' : 'custom'}`}

                                // break (...)
                                breakClassName="m-1"
                                breakLinkClassName={`btn btn-sm m-1 btn-outline-${Theme === 'dark' ? 'light' : 'dark'} border border-0`}

                                // active page
                                activeLinkClassName={`${Theme === 'dark' ? 'theme-dark' : 'text-bg-light'} btn btn-sm m-1 btn-outline-${Theme === 'dark' ? 'custom-alt' : 'custom'}`}

                                // disabled state
                                disabledClassName="disabled"
                            />

                        </div>

                        <div className="ms-auto justify-content-center align-items-center">
                           
                        </div>  

                    <div className="d-flex justify-content-center align-items-center ms-auto">
                    <strong>
                        Showing {_.size(table.getPaginationRowModel().rows)} of {_.size(table.getFilteredRowModel().rows)} records &nbsp;|&nbsp; 
                        Page {table.getPageCount() === 0 ? 0 : table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>
                    </div>


                        {/* <button className={`btn btn-outline-${Theme == 'dark' ? 'custom' : 'custom-alt'} btn-sm m-1`} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button> */}
                        {/* <button className={`btn btn-outline-${Theme == 'dark' ? 'custom-alt' : 'custom'} btn-sm m-3`} onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </button> */}
                    </div>
                )}
        </>
    )
}

export default CustomCommonTable