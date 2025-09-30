// src/inventario/components/InventoryTable.jsx
export const InventoryTable = ({ rows = [] }) => {
  return (
    <div className="inv-table">
      <table>
        <thead>
          <tr>
            <th className="th-actions">Baja</th>
            <th className="th-actions">Editar</th>
            <th className="th-actions">Eliminar</th>
            <th>Id</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>No. Serie</th>
            <th>Área</th>
            <th>Ubicación</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={10} className="empty">Sin resultados</td></tr>
          )}

          {rows.map((r, idx) => (
            <tr key={`${r.id}-${idx}`}>
              <td className="td-actions"><button title="Baja"><i className="fas fa-arrow-down" /></button></td>
              <td className="td-actions"><button title="Editar"><i className="fas fa-pen" /></button></td>
              <td className="td-actions"><button title="Eliminar"><i className="fas fa-trash" /></button></td>

              <td>{r.id}</td>
              <td>{r.nombre}</td>
              <td>{r.marca}</td>
              <td>{r.modelo}</td>
              <td>{r.serie}</td>
              <td>{r.area}</td>
              <td>{r.ubicacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
