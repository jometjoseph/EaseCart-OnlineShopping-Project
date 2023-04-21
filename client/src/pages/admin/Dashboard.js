function Dashboard() {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-primary table-striped table-hover table-responsive-md">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Product 1</td>
              <td>desc</td>
              <td>price</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Product 2</td>
              <td>desc</td>
              <td>price</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Product 2</td>
              <td>desc</td>
              <td>price</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;
