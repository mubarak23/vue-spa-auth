import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalaxios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	IdToken: null,
  	userId: null,
  	user: null
  },
  mutations: {
  	authUser (state, userData){
  			state.IdToken = userData.token,
  			state.userId = userData.userId
  	},
  	storeUser(state, user){
  			state.user = user
  	},

  },
  actions: {
  	signup ({commit, dispatch}, authData){
  		
  		axios.post('/signupNewUser?key=AIzaSyBH-Rgu4Kw13Cn__dy8ZUTjf_egolhnYPs', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }).then(res => {
        	console.log(res),
        	commit('authUser', {
        		token: res.data.idToken,
        		userId: res.data.localId
        	})
        	//dispatch('storeUser', authData)
        	dispatch('storeUser', authData)
        })
        .catch(error => console.log(error));
  	},
  	login ({commit}, authData){
  		 axios.post('/verifyPassword?key=AIzaSyBH-Rgu4Kw13Cn__dy8ZUTjf_egolhnYPs', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }).then(res => {
        	console.log(res),
        	commit('authUser', {
        		token: res.data.idToken,
        		userId: res.data.localId
        	})
        })
        .catch(error => console.log(error));
  	},
  	storeUser ({commit, state}, userData) {
  		if(!state.idToken){
  			return
  		}
  		globalaxios.post('/users.json' + '?auth=' + state.idToken, userData)
  		.then(res => console.log(res))
  		.then(error => console.log(error))
  	},

  	fetchUser ({commit, state}) {
  		if(!state.idToken){
  			return
  		}
  		globalaxios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res)
          const data = res.data
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          console.log(users)
          //this.email = users[0].email
          commit('storeUser', users[0])
        })
        .catch(error => console.log(error))
  	}

  },
  getters: {
  	user(state) {
  		return state.user
  	}
  }
})