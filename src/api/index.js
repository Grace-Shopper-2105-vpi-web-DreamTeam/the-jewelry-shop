import axios from 'axios';

const url = "https://loops-and-strings.herokuapp.com/"

export const getAllProducts = async () => {
  return axios({
    method: "GET",
    url: `${url}/api/products`
  }).then((response) => response.data)
}

export const getProductsByCategory = async (category) => {
  return axios({
    method: "GET",
    url: `${url}/api/products/category/${category}`
  }).then((response) => response.data)
}

export const login = async (username, password) => {
  return axios({
    method: "POST",
    url: `${url}/api/users/login`,
    data: {
      username: username,
      password: password,
    },
  }).then((response) => response.data)
};

export const register = async (username, password, emailAddress) => {
  return axios({
    method: "POST",
    url: `${url}/api/users/register`,
    data: {
      username: username,
      password: password,
      emailAddress: emailAddress
    },
  }).then((response) => response.data)
};

export const getUserOrders = async (userDetails) => {
  return axios({
    method: "GET",
    url: `${url}/api/orders/${userDetails.user.id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userDetails.token}`
    }
  }).then((response) => response.data)
}


export const getAllUsers = async (userDetails) => {
  return axios({
    method: "GET",
    url: `${url}/api/users/admin`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userDetails.token}`
    }
  }).then((response) => response.data)
}

export const getAllOrders = async (userDetails) => {
  return axios({
    method: "GET",
    url: `${url}/api/orders`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userDetails.token}`
    }
  }).then((response) => response.data)
}

export const updateUserAdmin = async (userId, userDetails) => {
  return axios({
    method: "PATCH",
    url: `${url}/api/users/admin/${userId}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userDetails.token}`
    }
  }).then((response) => { console.log('RESPONSE', response); return response.data })

}

export const deleteProduct = async (productId, userDetails) => {
  return axios({
    method: "DELETE",
    url: `${url}/api/products/${productId}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userDetails.token}`
    }
  }).then((response) => response.data)

}

export const createNewProduct = async (title, description, category, price, inventory, image, isActive, userDetails) => {
  return axios({
    method: "POST",
    url: `${url}/api/products`,
    data: {
      title: title,
      description: description,
      category: category,
      price: price,
      inventory: inventory,
      image: image,
      isActive: isActive
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userDetails.token}`,
    },
  })
  .catch((error) => {
    throw error.response.data.error
  })
  .then((response) => response.data);
};

export const updateProduct = async (productId, title, description, category, price, inventory, image, isActive, userDetails) => {
  return axios({
    method: "PATCH",
    url: `${url}/api/products/${productId}`,
    data: {
      title: title,
      description: description,
      category: category,
      price: price,
      inventory: inventory,
      image: image,
      isActive: isActive
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userDetails.token}`,
    },
  })
  .catch((error) => {
    throw error.response.data.error
  })
  .then((response) => response.data);
};

export const createCart = async (userId, token) => {
  return axios({
    method: "POST", 
    url: `${url}/api/cart/${userId}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then((response) => response.data)
}

export const cartToCheckout = async (userId, token) => {
  return axios({
    method:"DELETE",
    url: `${url}/api/cart/${userId}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then((response) => response.data)
}

export const createCartItems = async ({productId, quantity, cart_id}) => {
  return axios({
    method: "POST", 
    url: `${url}/api/cartitem/${cart_id}/items`,
    data: {
      productId,
      quantity
    }
  }).then((response) => response.data)
}


export const updateCartItems = async (quantity, cartItemId) => {
  return axios({
    method: "PATCH", 
    url: `${url}/api/cartitem/${cartItemId}`,
    data: {
      quantity
    }
  }).then((response) => response.data)
}

export const deleteCartItem = async (cartItemId) => {
  return axios({
    method: "DELETE", 
    url: `${url}/api/cartitem/${cartItemId}`
  }).then((response) => response.data)
}

export const getCart = async (userId, token) => {
  return axios({
    method: "GET",
    url: `${url}/api/cart/${userId}/usercart`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then((response) => response.data)
}






