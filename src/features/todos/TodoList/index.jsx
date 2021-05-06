import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './index.css';
import SortTypes from '../../../constants/sortTypes';
import StringUtils from '../../../utils/StringUtils';

function getSortCompare(sortType) {
  switch (sortType) {
    case SortTypes.DECREASE:
      return (i1, i2) => i2.name.localeCompare(i1.name);

    case SortTypes.STATUS_ACTIVE:
      return (i1, i2) => i2.status.localeCompare(i1.status);

    case SortTypes.STATUS_INACTIVE:
      return (i1, i2) => i1.status.localeCompare(i2.status);

    default:
      return (i1, i2) => i1.name.localeCompare(i2.name);
  }
}

function isIncludeText(target, value) {
  const searchSlug = StringUtils.toSlug(value);
  return target.includes(searchSlug);
}

function useTodoList() {
  const list = useSelector((state) => state.todo.list);
  const textSearch = useSelector((states) => states.todo.textSearch);
  const sortType = useSelector((state) => state.todo.sortType);

  const listFilter = list.filter((item) => isIncludeText(item.slug, textSearch));
  const sortCompare = getSortCompare(sortType);
  return listFilter.sort(sortCompare);
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const list = useTodoList();

  useEffect(() => {
    dispatch({ type: 'todo/fetch_todo_list' });
  }, []);

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [id, setId] = React.useState(null);

  const handleClickOpen = (todo) => {
    setName(todo.name);
    setId(todo.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteTodo = () => {
    if (id) {
      dispatch({ type: 'todo/delete_todo', payload: id });
    }
    setOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên</TableCell>
            <TableCell align="right">Trạng thái</TableCell>
            <TableCell align="right">Ngày bắt đầu</TableCell>
            <TableCell align="right">Ngày kết thúc</TableCell>
            <TableCell align="right">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{StringUtils.convertDate(row.startDate)}</TableCell>
              <TableCell align="right">{StringUtils.convertDate(row.endDate)}</TableCell>
              <TableCell align="right">
                <Link to={`/todos/${row.id}`}>
                  <Button
                    style={{ marginRight: '10px' }}
                    variant="contained"
                    color="primary"
                  >
                    Sửa
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleClickOpen(row)}
                >
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Bạn có muốn xóa ${name}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy bỏ
          </Button>
          <Button onClick={handleDeleteTodo} color="primary" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
