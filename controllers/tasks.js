const Task = require('../models/Task');
const catchAsync = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');

const getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find();

  // console.log(tasks);

  if (!tasks) {
    return next(new AppError('No tasks found', 400));
  }

  res.status(200).json({ success: true, tasks });
});

const getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError('No task found', 404));
  }
  res.status(200).json({ success: true, task });
});

const createTask = catchAsync(async (req, res, next) => {
  const task = await Task.create(req.body);

  res.status(201).json({ success: true, task });
});

const editTask = (req, res, next) => {
  res.send('Edit task');
};

const updateTask = catchAsync(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError('Task not found', 404));
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, task });
});

const deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError('No task found', 400));
  }

  await task.remove();

  res.status(200).json({ success: true, task: {} });
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  editTask,
  deleteTask,
};
