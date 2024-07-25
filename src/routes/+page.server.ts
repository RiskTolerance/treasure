export function load({ cookies }) {
	const cookieCheck = {
    parrot: cookies.get('parrot'),
    sails: cookies.get('sails'),
    wheel: cookies.get('wheel'),
    rudder: cookies.get('rudder'),
    anchor: cookies.get('anchor'),
    compass: cookies.get('compass')
  }

  // const cookieSet = (name: string, value: string) => {
  //   cookies.set(name, value, {path: '/'})
  // }

  // const cookieGet = (name: string) => {
  //    return cookies.get(name)
  // }

	return {
		cookieCheck
	};
}