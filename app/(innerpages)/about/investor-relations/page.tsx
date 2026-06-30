import Index from "../../../components/investor-relations/Index"

const page = async() => {

  const response = await fetch(`${process.env.BASE_URL}/api/investor_relation.php?lang=en`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();

  return (
    <>
      <Index data={data.data}/>
    </>
  )
}

export default page