import React, {Component} from 'react';
import axios from '../../../axios';
import {Route} from 'react-router-dom';
import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: []
    }
    
    componentDidMount() {
        axios.get('/posts')
            .then( response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map( post => {
                    return {
                        ...post,
                        author: 'Antarpreet'
                    }
                });
                this.setState({
                    posts: updatedPosts
                });
            })
            .catch( error => {
                // this.setState({
                //     error: true
                // });
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({
            pathname: '/posts/' + id
        });
    }

    render() {
        let posts = <p style={{textAlign: 'center', color: 'red'}}>Something went wrong</p>;
        if(!this.state.error) {
            posts = this.state.posts.map( post => {
                return (
                    //<Link to={'/posts/' + post.id}>
                        <Post 
                            title={post.title}
                            key={post.id}  
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)}/>
                    //</Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;