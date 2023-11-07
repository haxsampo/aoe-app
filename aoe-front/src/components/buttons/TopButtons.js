import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetCivs } from '../../reducers/civReducer'
import { resetPu } from '../../reducers/powerunitReducer'
import { pageChange, guideChange, civsSetChange } from '../../reducers/pageReducer'
import { setError } from '../../reducers/errorReducer'
import Login from './Login'
import Logout from './Logout'
import f from '../../utils/helpfuncs'

const TopButtons = () => {
  const [showLogin, setShowLogin] = useState(false)
  const civ1 = useSelector(state => state.civs['civ1'])
  const civ2 = useSelector(state => state.civs['civ2'])
  const showLogout = useSelector(state => state.buttonsState.logout)
  const userInfo = window.localStorage.getItem('loggedUser')
  const dispatch = useDispatch()
  const {isEmpty} = f

  const beginning = () => {
    dispatch(resetCivs())
    dispatch(resetPu())
    dispatch(pageChange('choose')) 
    dispatch(guideChange(''))
    dispatch(civsSetChange(0))
  }

  const showGuide = () => {
    if(isEmpty(civ1)) {
      dispatch(setError('choose at least one civ'))
      setTimeout(() => {
        dispatch(setError(null))
      }, 5000)
      return
    }
    if(!isEmpty(civ1) && !isEmpty(civ2)) {
      dispatch(guideChange('matchup'))
    }
    if(!isEmpty(civ1) && isEmpty(civ2)) {
      dispatch(guideChange('civguide'))
    }
    dispatch(pageChange('guide'))
  }

  return(
    <div>
      <button onClick={() => beginning()}>Start over</button>
      <button onClick={() => showGuide()}>Analyse with chosen specs</button>
      { !showLogout &&
        <Login showLogin={showLogin} setShowLogin={setShowLogin} />
      }
      { showLogout &&
        <>
          <button onClick={() => dispatch(pageChange('user'))}>Userinfo</button>
          <Logout setShowLogin={setShowLogin} />
        </>
      }
    </div>
  )
}

export default TopButtons