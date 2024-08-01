import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleProductApi, updateProductApi } from '../../apis/Api'
import { toast } from 'react-toastify'

const AdminEditProduct = () => {

  // receive product id from url
  const {id} = useParams()

  // navigator
  const navigate = useNavigate()

  // use effect to fetch product details
  useEffect(() => {
    // API call
    getSingleProductApi(id).then((res) =>{
      console.log(res.data)
      setProductName(res.data.product.productName)
      setProductPrice(res.data.product.productPrice)
      setProductCategory(res.data.product.productCategory)
      setProductDescription(res.data.product.productDescription)
      setOldImage(res.data.product.productImageUrl)
    })


  },[id])

  // make useState
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productDescription, setProductDescription] = useState('')

  // Make useState for image
  const [productImage, setProductImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [oldImage, setOldImage] = useState('')

  //  handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    setProductImage(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  // make function for button
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(productName,productPrice, productCategory, productDescription)
    console.log(productImage)

    // make a form data
    const formData = new FormData();
    formData.append('productName', productName)
    formData.append('productPrice', productPrice)
    formData.append('productCategory', productCategory)
    formData.append('productDescription', productDescription)
    formData.append('productImage', productImage)

    // Making Api Call
    updateProductApi(id,formData).then((res) =>{
      if(res.data.success == true){
        toast.success(res.data.message)
        navigate('/admin/dashboard')
      } else{
        toast.error(res.data.message)
      }
    }).catch(err =>{
      toast.error("Server Error")
    })


    
  }

  return (
    <>
      <h2 className='m-4'>Updating product for <span className='text-danger'>'{productName}'</span></h2>
      <div className='d-flex m-4 gap-4'>
        <div className=''>
          <form>
            <label>Product Name</label>
            <input value={productName} onChange={(e) => setProductName(e.target.value)} type="text" className='form-control mb-2' placeholder='Enter product name' />

            <label>Product Price</label>
            <input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} type="number" className='form-control mb-2' placeholder='Enter product price' />

            <label>Product Category</label>
            <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className='form-control mb-2'>
              <option value="Flower">Flower</option>
              <option value="Cake">Cake</option>
              <option value="Gift">Gift</option>
            </select>

            <label>Product Description</label>
            <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} name="" id="" cols="3" rows="3" className='form-control' placeholder='Enter description'></textarea>

            <label>Product Image</label>
            <input onChange={handleImageUpload} type="file" className='form-control mb-2' />

            <button onClick={handleSubmit} className='btn btn-primary w-100 mt-2'>Update product</button>


          </form>
        </div>
        <div>
            <h6>Old Image</h6>
            <img src={oldImage} className='object-fit-cover rounded-3' height={180} width={180} alt="" />
            <hr />
            {
              previewImage && <>
                  <h6 className='mt-3'>New Image</h6>
                  <img src={previewImage} className='object-fit-cover rounded-3' height={180} width={180} alt="" />
              </>
            }
        </div>
      </div>

    </>
  )
}

export default AdminEditProduct
