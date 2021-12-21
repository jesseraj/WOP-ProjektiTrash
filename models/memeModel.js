'use strict';
const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

const getAllMemes = async (next) => { //Tämä toimiii localhost:5000/meme
  try {
    const [rows] = await promisePool.execute(`
    SELECT 
      *
      FROM Käyttäjät
    `);
    return rows;
  } catch (e) {
    console.error('getAllMemes error', e.message);
    next(httpError('Database error', 500));
  }
};

const getMeme = async (id, next) => {
  try {
    const [rows] = await promisePool.execute(`
      SELECT 
      KäyttäjäID,
      KäyttäjäNimi,
      Salasana,
      Sposti,
      PuhelinNo,
      Rooli,
      Online,
      Profiilikuva,
      Liittymispv,
      UploadID
      FROM Käyttäjät
      WHERE KäyttäjäID = 1
      `,
      [id]
    );
    return rows;
  } catch (e) {
    console.error('getMeme error', e.message);
    next(httpError('Database error', 500));
  }
};

const addMeme = async (
  KäyttäjäNimi,
  next
) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO Käyttäjät (KäyttäjäNimi) VALUES (asd)',
      [KäyttäjäNimi]
    );
    return rows;
  } catch (e) {
    console.error('addMeme error', e.message);
    next(httpError('Database error', 500));
  }
};

const modifyMeme = async (
  name,
  weight,
  owner,
  birthdate,
  meme_id,
  role,
  next
) => {
  let sql =
    'UPDATE wop_meme SET name = ?, weight = ?, birthdate = ? WHERE meme_id = ? AND owner = ?;';
  let params = [name, weight, birthdate, meme_id, owner];
  if (role === 0) {
    sql =
      'UPDATE wop_meme SET name = ?, weight = ?, birthdate = ?, owner = ? WHERE meme_id = ?;';
    params = [name, weight, birthdate, owner, meme_id];
  }
  console.log('sql', sql);
  try {
    const [rows] = await promisePool.execute(sql, params);
    return rows;
  } catch (e) {
    console.error('addMeme error', e.message);
    next(httpError('Database error', 500));
  }
};

const deleteMeme = async (id, owner_id, role, next) => {
  let sql = 'DELETE FROM wop_meme WHERE meme_id = ? AND owner = ?';
  let params = [id, owner_id];
  if (role === 0) {
    sql = 'DELETE FROM wop_meme WHERE meme_id = ?';
    params = [id];
  }
  try {
    const [rows] = await promisePool.execute(sql, params);
    return rows;
  } catch (e) {
    console.error('getMeme error', e.message);
    next(httpError('Database error', 500));
  }
};

module.exports = {
  getAllMemes,
  getMeme,
  addMeme,
  modifyMeme,
  deleteMeme,
};
