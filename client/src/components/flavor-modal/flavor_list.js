import React from 'react';

export default props => {
    const { list } = props;

    const flavors = list.map((item, index) => {
        const { category, flavor } = item;
        return (
            <tr key={category.id + '' + flavor.id}>
                <td>{category.name}</td>
                <td>{flavor.name}</td>
            </tr>
        )
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Flavor</th>
                </tr>
            </thead>
            <tbody>
                {flavors}
            </tbody>
        </table>
    );
}
