const formatPath = (res) => {
  const fatherItem = res.filter(item => item.father_path === null);

  return fatherItem.map((item) => {
    const children = res.filter(child => item.path === child.father_path)

    return {
      ...item,
      children,
    }
  })
}


export default formatPath