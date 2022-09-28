// eslint-disable no console
const store = {};

/** 
 - subscribers a callback for an event
 - @param {string} eventName - Name of the event to listen for
 - @param {function} callback - Function to invoke when said event is fired
*/

const subscribe = (eventName, callback) => {
    if (!store[eventName]) {
        store[eventName] = new Set();
    }

    store[eventName].add(callback);

}

/** 
 - unsubscribe a callback for an event
 - @param {string} eventName - Name of the event to unsubscribe from
 - @param {function} callback - Function to unsubscribe
*/

const unsubscribe = (eventName, callback) => {
    if (!store[eventName]) {
        store[eventName].delete(callback);
    }
}

/** 
 - Publish a callback for an event
 - @param {string} eventName - Name of the event to unsubscribe from
 - @param {*} payload - Function to unsubscribe
*/

const publish = (eventName, payload) => {
    if(store[eventName]) {
        store[eventName].forEach(callback => {
            try{
                callback(payload);
            } catch(error){
                console.log(error);
            }
        })
    }
}

export default{
    subscribe,
    unsubscribe,
    publish
}

