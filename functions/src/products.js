const { connectDb } = require ("./db")


//get All products
exports.getAllProducts =(req,res) => {
  const db = connectDb()
  db.collection("am-clothes").get()
    .then(collection => {
      const clothes = collection.docs.map(doc => {
        let item = doc.data()
        item.id = doc.id
        return item
      })
      res.send(clothes)
      //res.send({
        //status: "200",
        //results: clothes.length,
        //success: true,
        //Message; "clothing collection returned"
        //data: clothes
     // })
    })
    .catch(err => res.status(500).send(err))
}

//getProductById
exports.getProductById =(req,res) => {
  const db =connectDb()
  //get productId from req.params
  //const productId = req.params.productId
  const { productId } = req.params
  db.collection("am-clothes").doc(productId).get()
    .then(doc => {
      let item = doc.data()
      item.id = doc.id
      res.send(item)
    })
    .catch(err => res.status(500).send(err))

  //get document from collection
}

//createProduct
exports.createProduct = (req,res) => {
  //check that all require fields are present
  if (!req.body.sku || !req.body.type || !req.body.price) {
    res.status(401).send9({message: "Invalid request"})
    return
  }
  //conctruct new clothing from the body
  let newItem = {
    sku: req.body.sku,
    type: req.body.type,
    price: Number(req.body.price.toFixed(2)),
    graphic: (req.body.graphic) ? true : false,
  }
  if(req.body.sizes) newItem.sizes = req.body.sizes
  if(req.body.brand) newItem.brand = req.body.brand
  if(req.body.color) newItem.color = req.body.color
  if(req.body.style) newItem.style = req.body.style

  const db =connectDb()
  db.collection("am-clothes").add(req.body)
    .then(docRef => res.status(201).send({id:docRef.id}))
    .catch(err => res.status(500).send(err))
}

//updateProduct
exports.updateProduct = (req,res) => {
  const { productId }  = req.params

  const db = connectDb()
  db.collection("am-clothes").doc(productId).update(req.body)
    .then(()=> res.status(202).send({message: "updated"}))
    .catch(err => res.status(500).send(err))
}

//deleteProduct
exports.deleteProduct = (req,res) => {
  const { productId }  = req.params
  const db = connectDb()
  db.collection("am-clothes").doc(productId).delete()
    .then(()=> res.status(202).send({message: "deleted"}))
    .catch(err => res.status(500).send(err))
}
