module.exports = `<h1>Home</h1>
<div>
  <table>
    <tr ng-repeat="row in data track by $index">

      <td ng-repeat="col in row track by $index">{{col}}</td>
    </tr>
  </table>

</div>
<a ui-sref="add">Go to Add</a>
`