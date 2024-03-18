import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState, MouseEvent, useMemo } from "react";
import { visuallyHidden } from "@mui/utils";
import dayjs from "dayjs";

type Data = {
  id: number;
  method: string;
  sum: string;
  time: string;
};

function createData(
  id: number,
  method: string,
  sum: string,
  time: string
): Data {
  return {
    id,
    method,
    sum,
    time,
  };
}

const rows = [
  createData(2, "USDTTRC20", "452", "2024-02-22T21:09:26.438Z"),
  createData(4, "USDTTRC20", "159", "2024-02-24T21:09:26.438Z"),
  createData(3, "USDTTRC20", "262", "2024-02-23T21:09:26.438Z"),
  createData(7, "USDTTRC20", "237", "2024-02-27T21:09:26.438Z"),
  createData(9, "USDTTRC20", "518", "2024-02-29T21:09:26.438Z"),
  createData(5, "USDTTRC20", "356", "2024-02-25T21:09:26.438Z"),
  createData(11, "USDTTRC20", "318", "2024-03-02T21:09:26.438Z"),
  createData(12, "USDTTRC20", "360", "2024-03-03T21:09:26.438Z"),
  createData(1, "USDTTRC20", "305", "2024-02-21T21:09:26.438Z"),
  createData(8, "USDTTRC20", "375", "2024-02-28T21:09:26.438Z"),
  createData(10, "USDTTRC20", "392", "2024-03-01T21:09:26.438Z"),
  createData(13, "USDTTRC20", "437", "2024-03-04T21:09:26.438Z"),
  createData(6, "USDTTRC20", "408", "2024-02-26T21:09:26.438Z"),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

type HeadCell = {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
};

const headCells: readonly HeadCell[] = [
  {
    id: "method",
    numeric: false,
    disablePadding: true,
    label: "Method",
  },
  {
    id: "sum",
    numeric: true,
    disablePadding: false,
    label: "Sum",
  },
  {
    id: "time",
    numeric: true,
    disablePadding: false,
    label: "Time",
  },
];

type EnhancedTableProps = {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
};

function EnhancedTableHead({
  order,
  orderBy,
  onRequestSort,
}: EnhancedTableProps) {
  const createSortHandler =
    (property: keyof Data) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Payment History
      </Typography>
    </Toolbar>
  );
}
export const PaymentHistory = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("time");

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)),
    [order, orderBy]
  );

  return (
    <Box sx={{ width: "700px" }}>
      <Paper sx={{ width: "100%" }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table sx={{ width: "100%" }}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => {
                return (
                  <TableRow hover key={row.id}>
                    <TableCell>{row.method}</TableCell>
                    <TableCell align="right">{row.sum}</TableCell>
                    <TableCell align="right">
                      {dayjs(row.time).format("MM/DD/YYYY h:mm")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
