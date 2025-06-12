import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './css/ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productList = JSON.parse(localStorage.getItem('productList')) || [];
    const found = productList.find(p => p.id.toString() === id);
    setProduct(found);
  }, [id]);

  if (!product) {
    return <div style={{ padding: '20px' }}>❗ 상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>← 뒤로가기</button>

      <div className="product-card-horizontal">
        <div className="product-detail-image">
          {/* 가짜 데이터 입력 */}
          <img src="https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/11/e4edf509-9a8b-45bd-9a36-979784f9d582.jpg" alt={product.title} />
        </div>

        <div className="product-detail-info">
          <h1 className="product-title">{product.title}</h1>
          <p><strong>모델:</strong> {product.model}</p>
          <p><strong>브랜드:</strong> {product.brand}</p>
          <p><strong>카테고리:</strong> {product.category}</p>
          <p><strong>설명:</strong> {product.spec_description}</p>
          <p><strong>메모리:</strong> {product.memory}GB</p>
          <p><strong>디스크 수:</strong> {product.disk_count}개</p>
          <p><strong>SSD:</strong> {product.has_ssd ? '있음' : '없음'}</p>
          <p><strong>CPU:</strong> {product.cpu}</p>
          <p><strong>가격:</strong> {product.price.toLocaleString()}원</p>
          <p><strong>원래 가격:</strong> {product.original_price.toLocaleString()}원</p>
          <p><strong>할인율:</strong> -{product.discount}%</p>
          <p><strong>판매자:</strong> {product.seller}</p>
          <p><strong>위치:</strong> {product.location}</p>
          <p className="rating">
            <strong>평점:</strong> ⭐ {product.rating} ({product.review_count}명)
          </p>
          <button className="buy-button">구매하러가기</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
