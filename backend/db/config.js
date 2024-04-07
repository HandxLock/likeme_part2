const dotenv = require('dotenv')
const { Pool } = require('pg')

dotenv.config()

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  allowExitOnIdle: true
})

const obtenerPost = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts;")
    console.log(rows)
    return rows
  } catch (error) {
    console.error('Error al obtener los registros:', error)
    return { code: 500, error }
  }
}

const getPost = async (titulo, img, descripcion) => {
  try {
    const consulta = "INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *;"
    const values = [titulo, img, descripcion]
    const { rows } = await pool.query(consulta, values)
    console.log("Post agregado:", rows[0]);
    return rows
  } catch (error) {
    console.log(error)
    return { code: 500, error }
  }
}
const updatePost = async (id) => {
  try {
    const updatedPost = await pool.query('UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *', [id]);
    return updatedPost.rows[0];
  } catch (error) {
    console.error("Error al agregar likes:", error)
    return { code: 500, error }
  }
};

const deletePost = async (id) => {
  try {
    const consulta = "DELETE FROM posts WHERE id = $1 RETURNING*;"
    const values = [id]
    const { rows } = await pool.query(consulta, values)
    return rows
  } catch (error) {
    console.error("Error al eliminar el post:", error)
    return { code: 500, error }
  }
}

module.exports = { getPost, obtenerPost, updatePost, deletePost }