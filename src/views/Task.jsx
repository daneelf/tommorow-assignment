import React, { memo, useState, useEffect } from "react";
import { Box, FormLabel, Tooltip } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import AlarmIcon from "@material-ui/icons/Alarm";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Card } from "./TaskStyles";
import { useColumnsData } from "../context/LocalContext";
import SaveIcon from "@material-ui/icons/Save";
import { getAverageEstimation } from "../utils/getAverageEstimation";

const Task = memo(({ task, handleRemoveTask, provided, columnId, handleSetAverageEstimation }) => {
  const [taskTitle, setTitle] = useState(task.title);
  const [taskDescription, setDescription] = useState(task.description);
  const [taskPriority, setPriority] = useState(task.priority);
  const [taskEstimation, setEstimation] = useState(task.timeEstimation);
  const [isEditing, setEditing] = useState(false);
  const [columnsData, setColumnsData] = useColumnsData();

  useEffect(() => {
    const averageEstimation = getAverageEstimation(columnsData[columnId]?.taskList);
    handleSetAverageEstimation(averageEstimation)
  }, [columnId, columnsData, handleSetAverageEstimation]);

  const handleEdit = (event) => {
    const { value, name } = event.target;
    if (name === "title") {
      setTitle(value);
    } else {
      setDescription(value);
    }
    setEditing(true);
  };

  const handlePriority = (event) => {
    const { value } = event.target;
    if (value <= 0) {
      event.target.value = 0;
    }
    setPriority(value);
    setEditing(true);
  };

  const handleUpdateTask = () => {
    const columns = { ...columnsData };
    const updatedTask = {
      ...task,
      title: taskTitle,
      description: taskDescription,
      priority: Number(taskPriority),
      timeEstimation: taskEstimation,
    };
    const taskIndex = columnsData[columnId].taskList.findIndex(
      (task) => task.id === updatedTask.id
    );
   
    columns[columnId].taskList[taskIndex] = updatedTask;
    setColumnsData(columns);
    setEditing(false);
  };

  const handleSetTime = (event) => {
    const { value, name } = event.target;
    const updatedEstimation = {
      ...taskEstimation,
      [name]: Number(value),
    };
    setEstimation(updatedEstimation);
    setEditing(true);
  };

  return (
    <div
      ref={(ref) => {
        provided.innerRef(ref);
      }}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Box width="300px">
        <Card>
          <Box mb="15px">
            <TextField
              variant="outlined"
              placeholder="Insert task title here"
              label="Title"
              name="title"
              fullWidth
              style={{ marginTop: "8px" }}
              value={taskTitle}
              onChange={handleEdit}
            />
            <TextField
              variant="outlined"
              type="number"
              label="Priority"
              fullWidth
              placeholder="Priority"
              name="priority"
              inputProps={{ min: 0, max: 99 }}
              style={{ marginTop: "12px" }}
              value={taskPriority}
              onChange={handlePriority}
            />
          </Box>

          <TextField
            variant="outlined"
            label="Description"
            name="description"
            multiline
            fullWidth
            rows={5}
            inputProps={{ min: 0, max: 99 }}
            placeholder="Description"
            value={taskDescription}
            onChange={handleEdit}
          />

          <Box mt="5px">
            <Box component={FormLabel}>Estimation time</Box>
          </Box>

          <Box
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" width="125px" mt="5px">
              <AlarmIcon style={{ marginRight: "5px" }} />
              <TextField
                size="small"
                type="number"
                placeholder="HH"
                name="hours"
                inputProps={{ style: { textAlign: "end" }, min: 0, max: 99 }}
                style={{ marginRight: "5px" }}
                value={taskEstimation.hours}
                onChange={handleSetTime}
              />
              :
              <TextField
                size="small"
                type="number"
                placeholder="MM"
                min={1}
                max={99}
                name="minutes"
                inputProps={{ style: { textAlign: "end" }, min: 0, max: 99 }}
                style={{ marginLeft: "5px" }}
                value={taskEstimation.minutes}
                onChange={handleSetTime}
              />
            </Box>
            <Box
              display="flex"
              alignItems="flex-end"
              justifyContent="space-between"
            >
              {isEditing && (
                <Tooltip title="Save task" aria-label="save task">
                  <SaveIcon color="primary" onClick={handleUpdateTask} />
                </Tooltip>
              )}

              <Tooltip title="Delete task" aria-label="delete task">
                <HighlightOffIcon
                  color="secondary"
                  onClick={() => handleRemoveTask(task.id)}
                />
              </Tooltip>
            </Box>
          </Box>
        </Card>
      </Box>
    </div>
  );
});

export default Task;
