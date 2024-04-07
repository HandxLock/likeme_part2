const express = require('express')
const cors = require('cors')
const { getPost, obtenerPost, updatePost , deletePost } = require('../db/config.js')
const app = express()

app.use(express.json())
app.use(cors())

app.get("/posts", async (_, res) => {
  const post = await obtenerPost()
  res.json(post)
})

app.post("/posts", async (req, res) => {
  const {titulo, url, descripcion } = req.body
  try {
    await getPost(titulo, url, descripcion)
    res.status(201).json({ mensaje: "post agregada con éxito" })
  } catch (error) {
    console.error('Error al agregar post:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params
  try {
    await updatePost(id)
    res.status(200).json("Post modificado con éxito")
  } catch (error) {
    console.log("error al dar like", error)
  }
})

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params
  try {
    await deletePost(id)
    res.status(204).json("Post eliminado con éxito")
  } catch (error) {
    console.log("error al eliminar", error)
  }
})

app.listen(3000, console.log("¡Servidor encendido!"))