import Queue from "../Queue.js";

export const createQueue = async (req, res) => {
  try {
    const { name } = req.body;

    const queue = await Queue.create({
      name,
      createdBy:  req.user.id,
    });

    res.status(201).json({
      message: "Queue created successfully",
      queue,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const joinQueue = async (req, res) => {
  try {
    const { queueId } = req.body;

    const queue = await Queue.findById(queueId);

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    queue.users.push(req.user.id);

    await queue.save();

    res.json({
      message: "Joined queue successfully",
      position: queue.users.length,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getQueue = async (req, res) => {
  try {
    const { queueId } = req.params;

    const queue = await Queue.findById(queueId);

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    res.json({
      queue: queue.name,
      totalPeople: queue.users.length,
      status: queue.status,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const leaveQueue = async (req, res) => {
  try {
    const { queueId } = req.body;

    const queue = await Queue.findById(queueId);

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    queue.users.pop();

    await queue.save();

    res.json({
      message: "Left queue successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const serveNext = async (req, res) => {
  try {
    const { queueId } = req.body;

    const queue = await Queue.findById(queueId);

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }


    queue.users.shift();

    await queue.save();

    res.json({
      message: "Next person served successfully",
      remainingPeople: queue.users.length,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
