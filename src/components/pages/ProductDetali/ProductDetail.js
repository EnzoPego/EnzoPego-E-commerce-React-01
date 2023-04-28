
import React from "react";
import Details from "../../Details";
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
//Firebase
import { collection, query, getDocs,where,documentId } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";


const ProductDetali = () => {

  let { id } = useParams()

  const [product, setProduct] = useState([]);  

  useEffect(() => {

    const q = query(collection(db, "products"), where(documentId(),"==", id));

    const getProducts = async () => {
      const querySnapshot = await getDocs(q);
      const docs = [];
      querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
      });

      setProduct(docs[0]);
    };

   getProducts();

  }, [id]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>

      <Details data={product} />

    </div>
  )

}


export default ProductDetali