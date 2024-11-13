// api/tasks.js
module.exports = async (req, res) => {
  if (req.method === "GET") {
    // Sample response
    res.status(200).json({ message: "Tasks fetched successfully" });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
