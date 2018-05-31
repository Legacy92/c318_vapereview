import React from 'react';

export default props => {
    const { list } = props;

    const flavors = list.map((item, index) => {
        const { category, flavor } = item;
        return (
            <tr className="add-review-chosen-flavor" key={category.id + '' + flavor.id}>
                {/*<td>{category.name}</td>*/}
                <td>{flavor.name}</td>
            </tr>
        )
    });

    return (
        <table className="add-review-dropdown-table">
            <thead>
                <tr>
                    {/*<th className="col-12 col-md-6">Juice Category</th>*/}
                    <th className="col-12 col-md-6">Flavors Chosen</th>
                </tr>
            </thead>
            <tbody>
                {flavors}
            </tbody>
        </table>
    );
}
