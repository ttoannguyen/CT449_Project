<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-main">
        <h2>Xác nhận mượn sách</h2>
        <p>Bạn có chắc chắn muốn mượn sách này?</p>
      </div>
      <div class="modal-buttons">
        <button @click="borrowBook">Mượn</button>
        <button @click="closeModal">Hủy</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import ProductService from "@/services/client/product.service";
export default {
  name: "BorrowModal",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  //   user: {
  //     type: Object,
  //     required: true,
  //   },
  // },

  data() {
    return {
      user: null,
      productId: "",
      status: "",
    };
  },

  methods: {
    async borrowBook() {
      try {
        const dataUser = localStorage.getItem("user");
        if (dataUser) {
          console.log(dataUser);
          this.user = JSON.parse(dataUser);

          console.log("[borrowBook]", this.user);
        }

        this.productId = this.$route.params.id;
        console.log(this.productId);
        console.log(this.user);
        const a = await ProductService.borrowProduct(this.productId, this.user);
        console.log("[Borrow Modal] Mượn sách thành công!");
        console.log(a);
        this.status = a.data.status;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đã gửi yêu cầu thành công!",
          showConfirmButton: false,
          timer: 1500,
        });

        this.$router.push({
          name: `product-detail`,
          params: { id: this.product._id },
          query: { message: a.data.status },
        });
        this.closeModal();
      } catch (error) {
        console.error("[Borrow Modal] Lỗi khi mượn sách:", error.message);
      }
    },
    closeModal() {
      this.$emit("close");
      this.$emit("data", this.status);
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  width: 40%;
  height: 30%;
  color: #12372a;
  font-family: Helvetica;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.modal h2 {
  margin-top: 0;
}

.modal p {
  margin-bottom: 10px;
}

.modal-buttons {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  align-items: center;
}

.modal-buttons button {
  margin-left: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  background-color: #38b453;
  color: white;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.modal-buttons button:hover {
  background-color: #45a049;
}

.modal-buttons button:focus {
  outline: none;
}

.modal-buttons button:last-child {
  margin-left: 30px;
  background-color: #ec804a;
}
</style>
