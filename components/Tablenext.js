
import React from 'react'
import { useTable, useSortBy } from 'react-table'
import { useRouter } from "next/router";



function Table({ columns, data }) {
  
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  },
  useSortBy
  )

    const router = useRouter();


  // Render the UI for your table
  return (
    <table 
    className='table-auto w-full bg-sec border-8 border-cuar rounded-lg overflow-hidden shadow-ter shadow-md font-mono font-bold text-xl'
    {...getTableProps()}>
      <thead
      className='text-center border-b-2 border-ter'
      >
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
                <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr 
            className='hover:bg-quin hover:border hover:border-quin'
            {...row.getRowProps({
              onClick: () => { router.push({ 
              pathname: '/[row]',
              query: { row: row.original.id }
              })
            }}, ) }>
              {row.cells.map(cell => {
                return (
                  <th
                  className='text-cuar'
                  {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </th>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function Tablenext({ brews }) {
  const columns = React.useMemo(
    () => [
      {
        accessor: "machine",
        Header: "MACHINE 🤖",
      },
      {
        accessor: "model",
        Header: "MODEL ⚙️",
      },
      {
        accessor: "water_type",
        Header: "WATER 💧",
      },
      {
        accessor: "coffee",
        Header: "COFFEE 🫘",
      },
      {
        accessor: "grams",
        Header: "GRAMS ⚖️",
      },
      {
        accessor: "time",
        Header: "TIME ⏱",
      },
    ],
  
    []
  )

  const data = React.useMemo(() => brews, [])


  return (
      <Table columns={columns} data={data} />
  )
}

export default Tablenext

