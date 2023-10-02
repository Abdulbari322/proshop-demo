import React from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import './HomeScreen.css'

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams()

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  })

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.error || error.data.message}</Message>
      ) : (
        <>
          <Meta title='Hello' />
          <h1 className='home-title'>Latest Products</h1>
          <Row className='product-container'>
            {data.products.map((product) => (
              <Col
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className='product-item'
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
