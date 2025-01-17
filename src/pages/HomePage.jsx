import { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Empty from '../components/Empty';

// import arrowRight from "../assets/icon-next.svg"
// import arrowLeft from "../assets/icon-previous.svg"
// import { LIMIT } from '../constants';

export class HomePage extends Component {
    state = {
        products: [],
        loading: false,
        search: '',
        // total: 0,
        // activePage: 1
    }

    async getProducts() {

        try {
            this.setState({ loading: true })
            const params = {
                // page: activePage,
                // limit: LIMIT
            }
            const { data: allProducts } = await axios('https://fakestoreapi.com/products')
            const { data: products } = await axios('https://fakestoreapi.com/products', { params })

            this.setState({ products, total: allProducts.length })
        } catch (err) {
            console.log(err)
        } finally {
            this.setState({ loading: false })
        }
    }

    componentDidMount() {
        this.getProducts()
    }

    render() {
        const { products, loading, search, cart } = this.state;
        const { addToCart } = this.props

        let filteredProducts = products.filter((product) => {
            return product.title.toLowerCase().includes(search.toLowerCase());
        });

        const handleValue = (e) => {
            this.setState({ search: e.target.value });
        };



        return (
            <div className='max-w-7xl mx-auto px-5'>
                <input value={search} onChange={handleValue} type="text" placeholder="Searching..." className="input input-bordered w-full my-5" />
                <h1 className='text-3xl'>All Products ({filteredProducts.length})</h1>
                <div className='flex flex-wrap gap-4 justify-evenly my-5'>
                    {
                        loading ? <Loading /> : filteredProducts.length ? filteredProducts.map((product) => {
                            return (
                                <div key={product.id} className="border shadow-xl w-[296px] mb-6 transition-all hover:shadow-2xl rounded-lg own-card overflow-hidden pt-3">
                                    <div className='relative '>
                                        <img src={product.image} className='w-[220px] h-[220px] object-contain mx-auto' alt={product.title} />
                                        <div className='px-3 py-2 absolute bottom-0 bg-white border'><p className='text-[#9A9AB0] text-[14px] font-bold'>{product.category}</p></div>
                                    </div>
                                    <div className="p-4">
                                        <h2 className="text-[16px] font-bold">{product.title.slice(0, 29)}</h2>
                                        <p className='text-blue-500 mt-1'>{product.description.slice(0, 90)}...</p>
                                        <div className="flex gap-1 mt-4 justify-between">
                                            <p className='text-[#ffffff] flex gap-1 px-2 py-1 text-[14px] rounded-lg bg-yellow-500 border'>Price <span>{product.price}$</span></p>
                                            <p className='text-[#ffffff] flex gap-1 px-2 py-1 text-[14px] rounded-lg bg-blue-500 border'>Rating <span>{product.rating.rate}</span></p>
                                            <p className='text-[#ffffff] flex gap-1 px-2 py-1 text-[14px] rounded-lg bg-green-500 border'>Count <span>{product.rating.count}</span></p>
                                        </div>
                                        <div className='flex gap-2'>
                                            <Link to={`/product-page/${product.id}`} className="btn w-1/2 mt-4 btn-outline  btn-secondary">Read more </Link>
                                            <button onClick={() => addToCart(product.id)} to={`/product-page/${product.id}`} className="btn w-1/2 mt-4 btn-primary">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : <Empty />
                    }
                </div>
            </div>
        );
    }

}

export default HomePage


