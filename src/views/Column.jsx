import {
  Badge,
  Box,
  Divider,
  FormControl,
  Input,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Tooltip,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import MenuIcon from "@material-ui/icons/Menu";
import React, { memo, useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useColumnsData } from "../context/LocalContext";
import { generateId } from "../utils/generateId";
import { getAverageEstimation } from "../utils/getAverageEstimation";
import { getListAfterRemove } from "../utils/getItemsAfterRemove";
import { sortTaskList } from "../utils/sort";
import { ColumnWrapper, Container } from "./ColumnStyles";
import Task from "./Task";

const extraStyles = makeStyles((theme) =>
  createStyles({
    menuIcon: {
      color: "#9370db",
      cursor: "pointer",
    },
    divider: {
      height: "2px",
    },
    sortByWrapper: {
      marginTop: theme.spacing(1),
      minWidth: "120px",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    badge: {
      margin: "0 12px",
    },
    averageBadge: {
      margin: "0 15px",
    },
    totalTasks: {
      textAlign: "right",
    },
    indicators: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      padding: "10px",
    },
    averageEstimation: {
      textAlign: "right",
      padding: "10px",
    },
  })
);

const Column = memo(({ column, handleRemoveColumn }) => {
  const [columnsData] = useColumnsData();
  const [columnTitle, setTitle] = useState("");
  const [columnTaskList, setColumnTaskList] = useState([]);
  const [sortByPriority, setSortPriority] = useState("");
  const [tasksLength, setTaskLength] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [averageEstimation, setAverageEtimation] = useState(0);
  const classes = extraStyles();

  useEffect(() => {
    const columnId = column?.id;
    const currentTaskList = columnsData[columnId]?.taskList;
    const columnTasksAverageEstimation = getAverageEstimation(currentTaskList);

    setColumnTaskList(currentTaskList);
    setTaskLength(currentTaskList.length);
    setAverageEtimation(columnTasksAverageEstimation);
  }, [column?.id, columnsData]);


  const handleSetColumnTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleAddTask = () => {
    const newTask = {
      id: generateId(),
      title: "new task title",
      description: "",
      timeEstimation: {
        hours: 2,
        minutes: 0,
      },
      priority: columnTaskList.length,
    };

    const updatedList = [...columnTaskList, newTask];

    const updatedColumn = {
      ...column,
      title: columnTitle,
      taskList: updatedList,
    };
    setColumnTaskList(updatedList);
    setTaskLength(updatedList.length);
    columnsData[column.id] = updatedColumn;
    handleMenuClose();
  };

  const handleSortChange = (event) => {
    const { value } = event.target;
    let sortedTaskList = [];

    setSortPriority(value);

    if (!value) {
      return undefined;
    }
    sortedTaskList = sortTaskList(columnsData, column.id, value);
    setColumnTaskList(sortedTaskList);
  };

  const handleRemoveTask = (id) => {
    const updatedTaskList = getListAfterRemove(columnTaskList, id);
    setTaskLength(updatedTaskList.length);

    const updatedColumn = {
      ...column,
      taskList: updatedTaskList,
    };

    setColumnTaskList(updatedTaskList);
    columnsData[column.id] = updatedColumn;
  };

  const handleOnBlur = () => {
    const updatedColumn = {
      ...column,
      title: columnTitle,
    };
    columnsData[column.id] = updatedColumn;
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ColumnWrapper>
      <Droppable droppableId={String(column?.id)}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Container>
              <Input
                placeholder="Column title"
                value={columnTitle}
                onBlur={handleOnBlur}
                onChange={handleSetColumnTitle}
                style={{ width: "80%", fontSize: "20px" }}
              />
              <Tooltip title="Column actions" aria-label="column actions">
                <MenuIcon
                  onClick={handleMenuClick}
                  className={classes.menuIcon}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                />
              </Tooltip>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleAddTask}>
                  <AddCircleIcon color="primary" />
                  Add Task
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => handleRemoveColumn(column.id)}
                  disabled={columnTaskList.length > 0}
                >
                  <DeleteForeverRoundedIcon color="error" />
                  Delete column
                </MenuItem>
              </Menu>
            </Container>
            <Divider className={classes.divider} />

            <Box className={classes.indicators}>
              <FormControl className={classes.sortByWrapper}>
                <InputLabel shrink id="demo-simple-select-filled-label">
                  Sort by
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={sortByPriority}
                  displayEmpty
                  onChange={handleSortChange}
                  className={classes.selectEmpty}
                  inputProps={{ readOnly: columnTaskList?.length <= 0 }}
                >
                  <MenuItem value="">
                    <em>Default</em>
                  </MenuItem>
                  <MenuItem value="highest_priority">Highest priority</MenuItem>
                  <MenuItem value="lowest_priority">Lowest priority</MenuItem>
                </Select>
              </FormControl>
              <Box className={classes.totalTasks}>
                Tasks:{" "}
                <Badge
                  className={classes.badge}
                  badgeContent={tasksLength}
                  showZero
                  color="secondary"
                />
              </Box>
            </Box>
            <Box className={classes.averageEstimation}>
              Average Task Estimation:{" "}
              <Badge
                className={classes.averageBadge}
                badgeContent={averageEstimation}
                showZero
                color="primary"
              />
            </Box>
            {columnTaskList && columnTaskList.length > 0
              ? columnTaskList.map((task, index) => {
                  return (
                    <Draggable
                      draggableId={String(task.id)}
                      index={index}
                      key={String(task.id)}
                    >
                      {(provided) => (
                        <Task
                          task={task}
                          columnId={column.id}
                          handleRemoveTask={handleRemoveTask}
                          handleSetAverageEstimation={(value) =>
                            setAverageEtimation(value)
                          }
                          provided={provided}
                        />
                      )}
                    </Draggable>
                  );
                })
              : null}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </ColumnWrapper>
  );
});

export default Column;
