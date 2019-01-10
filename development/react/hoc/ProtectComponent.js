import React from 'react'

const protectComponent = props => {
  console.log(props)
  const isModule = props.isModule ? true : false
  let component

  if ( isModule ) {
    component = handleModuleComponent( props.module, props.children )
  } else {
    component = handleComponentValidation( props.module, props.perm, props.children )
    console.log('is not module')
  }

  return component
}

const verifyComponent = () => {

}

const handleModuleComponent = ( module, component ) => {
  const isModuleOnPerm = verifyModule( module )

  if ( isModuleOnPerm ) {
    return component
  } else {
    return null
  }
}

const handleComponentValidation = ( module, perm, component ) => {
  const isModuleOnPerm = verifyModule( module )
  const isPermOnList = verifyPerm( module, perm )

  if ( isModuleOnPerm && isPermOnList ) {
    return component
  } else {
    return null
  }
}

const verifyModule = ( module ) => {
  const userPermissions = localStorage.getItem( 'permissions' ) ? JSON.parse(localStorage.getItem( 'permissions' )) : {} 
  const userModules = Object.keys( userPermissions )

  return userModules.indexOf( module ) !== -1
}

const verifyPerm = ( module, perm ) => {
  const userPerms = localStorage.getItem( 'permissions' ) ? 
    JSON.parse( localStorage.getItem( 'permissions' ) )[module] ?
      JSON.parse( localStorage.getItem( 'permissions' ) )[module]
      : [] 
    : []

  console.log( userPerms.includes( perm ) )
  return userPerms.includes( perm )
}

export default protectComponent