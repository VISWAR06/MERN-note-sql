
const db = require('../db');

const create = async (req, res) => {
  try {
    const { content } = req.body; 
    const userid = req.user.id;
    const [result] = await db.query(
      "INSERT INTO notes (userid, note) VALUES (?, ?)",
      [userid, content]
    );
    res.status(200).json({
      msg: "Created successfully",
      note_id: result.insertId,
      userid: userid,
    });
  } catch (e) {
    res.status(500).json({
      msg: e.message,
    });
  }
};

const getnote = async (req, res) => {
  try {
    const userid = req.user.id;
    const [notes] = await db.query(
      "SELECT * FROM notes WHERE userid = ?",
      [userid]
    );
    res.json({
      notes,
    });
  } catch (e) {
    res.status(500).json({
      msg: e.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const userid = req.user.id;
    const { content } = req.body; 
    const noteid = req.params.id;
    const [result] = await db.query(
      "UPDATE notes SET note = ? WHERE userid = ? AND noteid = ?",
      [content, userid, noteid]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        msg: "No note found",
      });
    }
    res.status(200).json({ msg: "Note updated" });
  } catch (e) {
    res.status(500).json({
      msg: e.message,
    });
  }
};

const del = async (req, res) => {
  try {
    const userid = req.user.id;
    const noteid = req.params.id;
    const [result] = await db.query(
      'DELETE FROM notes WHERE userid = ? AND noteid = ?',
      [userid, noteid]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "No note found with that ID" });
    }
    res.json({ msg: "Deleted successfully" });
  } catch (e) {
    res.status(500).json({
      msg: e.message,
    });
  }
};

module.exports = { create, getnote, update, del };