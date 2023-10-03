import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/");
  }
  
  const getProducts = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`https://dummyjson.com/products${selectedCategory ? `/category/${selectedCategory}` : ""}`, headers)
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getCategories = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get("https://dummyjson.com/products/categories", headers)
      .then((res) => {
        if (res.status === 200) {
          setCategories(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [selectedCategory]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
          padding: "5px",
        }}
      >
        <div
          style={{
            backgroundColor: selectedCategory === "" ? "black" : "grey",
            cursor: "pointer",
            margin: "5px",
            padding: "5px 15px",
            borderRadius: "5px",
            fontWeight: "bold",
            color: "white",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            transition: "background-color 0.2s",
          }}
          onClick={() => {
            setSelectedCategory("");
          }}
        >
          <span>All Products</span>
        </div>
        {categories?.length > 0 &&
          categories?.map((item) => (
            <div
              key={item}
              style={{
                backgroundColor: item === selectedCategory ? "black" : "grey",
                cursor: "pointer",
                margin: "5px",
                padding: "5px 15px",
                borderRadius: "5px",
                fontWeight: "bold",
                color: "white",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                transition: "background-color 0.2s",
              }}
              onClick={() => {
                setSelectedCategory(item);
              }}
            >
              <span>{item}</span>
            </div>
          ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {products?.length > 0 &&
          products?.map((item, index) => (
            <div
              key={index}
              style={{
                height: "300px",
                width: "200px",
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                willChange: "transform, box-shadow",
                backgroundColor: "white",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                borderRadius: "10px",
                padding: "10px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ width: "100%", height: "60%" }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={item?.thumbnail}
                  alt={item?.name}
                />
              </div>
              <div
                style={{
                  padding: "10px",
                  textAlign: "center",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                  marginBottom: "10px",
                }}
              >
                <h4
                  style={{
                    fontSize: "14px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    margin: "0",
                  }}
                >
                  {item?.name}
                </h4>
                <p>{item?.description}</p>
                <span
                  style={{
                    width: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: "bold",
                  }}
                >
                  Price: ${item?.price}
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Product;
