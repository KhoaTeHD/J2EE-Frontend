1. static file serving:
- public dùng để lưu file css, hình ảnh, link,... mà người dùng có thể truy cập đc.
- khi dùng thẻ link và dẫn link href dùng / không dùng ./ ví dụ: href="/icon.svg";
2. react class components
- state: là giá trị data hiện tại của component, có thể thay đổi đc
- props: là data của nơi khác truyền vào cho nó chỉ nhận và ko đc phép thay đổi
- constructor: chỉ chạy một lần duy nhất
- Các hàm component:
 + componentDidMount: chạy sau khi render
 + componentWillMount: chạy trước khi render
 + componentDidUpdate: chạy sau khi render
 + componentWillUnmount: chạy sau khi render và component sẽ xóa khỏi cấu trúc DOM
3. react function components:
- constructor: chạy lại mỗi khi thực hiện function
4. hooks
- useState: dùng để khởi tạo một dữ liệu hoặc thuộc tính
+ cú pháp: 
import { useState } from "react";
const [counter, setCounter] = useState(""); 
+ 2 thành phần: counter: trạng thái hiện tại cùa state
                setCounter: trạng thái thay đổi của state
- useEffect: tương tự như các hàm componentDidMount và componentDidUpdate trong class components. và chạy mỗi khi render
- Khi hàm useEffect sử dụng return thì hàm useEffect sẽ tương tự như hàm componentWillUnmount. Thường dùng hàm này để ẩn đi components nào đó
/*
typescript giúo hỗ trợ định nghĩa các biến
các file js => ts
các file jsx => tsx 
jsx là gì? jsx khi chứa các cú pháp của react và mở rộng của javascript
tại sao lại dùng jsx? jsx ngắn gọn hơn js ví dụ 
js: React.createElement('h2', {className: 'title'}, 'This is Title')
jsx: <h2 className="title">This is Title</h2>
*/