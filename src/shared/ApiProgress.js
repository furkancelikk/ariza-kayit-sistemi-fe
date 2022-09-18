// import React, {Component} from 'react';
// import axios from "axios";
//
// function getDisplayName(WrappedComponent){
//     return WrappedComponent.displayName || WrappedComponent.name || "Component"
// }
//
// export default function withApiProgress(WrappedComponent, apiPath){
//
//     return class ApiProgress extends Component {
//
//         static displayName = `Api Progress(${getDisplayName(WrappedComponent)})`;
//
//         state = {
//             isApiCall: false
//         }
//
//         // componentDidMount() {
//         //     this.requestInterceptor = axios.interceptors.request.use((request) => {
//         //         console.log("request", apiPath)
//         //         this.updateApiCall(request.url, true);
//         //         return request;
//         //     })
//         //
//         //     this.responseInterceptor = axios.interceptors.response.use((response) => {
//         //         this.updateApiCall(response.config.url, false);
//         //     }, (error) => {
//         //         this.updateApiCall(error.config.url, false);
//         //         throw error;
//         //     })
//         // }
//         //
//         // componentWillUnmount() {
//         //     axios.interceptors.request.eject(this.requestInterceptor);
//         //     axios.interceptors.response.eject(this.responseInterceptor);
//         // }
//
//         updateApiCall(url, progress){
//             if (url === apiPath){
//                 this.setState({isApiCall: progress});
//             }
//         };
//
//         render() {
//             return (
//                 <WrappedComponent isApiCall={this.state.isApiCall} {...this.props}/>
//             );
//         }
//     };
// }
