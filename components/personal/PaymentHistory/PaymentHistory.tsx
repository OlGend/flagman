import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState, MouseEvent } from "react";
import { visuallyHidden } from "@mui/utils";
import dayjs from "dayjs";

type PaymentHistory = {
  USD: string;
  paymentAddress: string;
  paymentMethod: string;
  paymentSumIn: string;
  status: string;
  timestamp: string;
};

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

type HeadCell = {
  disablePadding: boolean;
  id: keyof PaymentHistory;
  label: string;
  numeric: boolean;
};

const headCells: readonly HeadCell[] = [
  {
    id: "paymentMethod",
    numeric: false,
    disablePadding: true,
    label: "Withdrawal method",
  },
  {
    id: "paymentSumIn",
    numeric: false,
    disablePadding: false,
    label: "Amount",
  },
  {
    id: "paymentAddress",
    numeric: false,
    disablePadding: false,
    label: "Wallet address",
  },
  {
    id: "timestamp",
    numeric: false,
    disablePadding: false,
    label: "Time of request",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];

type EnhancedTableProps = {
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof PaymentHistory
  ) => void;
  order: Order;
  orderBy: string;
};

function EnhancedTableHead({
  order,
  orderBy,
  onRequestSort,
}: EnhancedTableProps) {
  const createSortHandler =
    (property: keyof PaymentHistory) => (event: MouseEvent<unknown>) => {
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

type PaymentHistoryProps = {
  statusPayment: string | null | undefined;
};

export const PaymentHistory = ({ statusPayment }: PaymentHistoryProps) => {
  const paymentHistory: PaymentHistory[] = JSON.parse(statusPayment ?? "[]");

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof PaymentHistory>("timestamp");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof PaymentHistory
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const onChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedRows = paymentHistory
    .sort(getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
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
        <TableContainer>
          <Table sx={{ width: "100%" }}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {sortedRows.map((row, idx) => {
                return (
                  <TableRow hover key={idx}>
                    <TableCell>{row.paymentMethod}</TableCell>
                    <TableCell>{row.paymentSumIn}</TableCell>
                    <TableCell>{row.paymentAddress}</TableCell>
                    <TableCell>
                      {dayjs(row.timestamp).format("ddd, DD MMM YYYY hh:mm:ss a")}
                    </TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
