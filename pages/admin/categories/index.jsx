import React from "react";
import PanelHeader from "../../../panel/common/PanelHeader";
import AdminLayout from "../../../panel/admin/AdminLayout";
import CategoryComponents from "../../../panel/admin/CategoryComponents";

const Categories = () => {
  return (
    <>
      <PanelHeader />
      <AdminLayout>
        <CategoryComponents />
      </AdminLayout>
    </>
  );
};

export default Categories;
