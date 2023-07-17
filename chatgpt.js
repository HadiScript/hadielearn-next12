here is all parent component things
const { batches, loading } = useActiveBatches();

from this hook am fetching active batches data 

const [open, setOpen] = useState(false);
and after this i have open model states

and i am showing activeBatch data in table 
<td className="text-dark">
<BsFolder2Open
  role="button"
  onClick={() => {
    setCurrent(x);
    setOpen(true);
  }}
/>
</td>

setOpen(true)
makes currect batch model

now i open my one batch model where i can see all enrolled students
and am receving these params from active batch component to this one batch model
({setOpen,
open,
current,
setCurrent,})

in the one batch model we are showing data in list (ant design)
<List
size="small"
bordered
dataSource={current?.enrolledStudents}
renderItem={(item) => (
  <List.Item
    actions={[
      renderPaymentStatus(item),

      // just give detail is payment added or not?
      <Tag
        role="button"
        color={
          item.payments?.find((x) => x.batch._id === current._id)
            ?.completed
            ? "green"
            : "blue"
        }
      >
        payments -
        {item.payments?.find((x) => x.batch._id === current._id)
          ? "Added"
          : " Not Added"}
      </Tag>,

      <Tag
        role="button"
        color={!current.completed ? "red" : "gray"}
        onClick={() =>
          !current.completed ? UnAssigned(item._id, current._id) : ""
        }
      >
        Un Assign
      </Tag>,
    ]}
  >
    <List.Item.Meta title={item.name} description={item._id} />
  </List.Item>
)}
/>

and here is the 
const renderPaymentStatus = (student) => {
  const payment = student.payments.find((p) => p.batch._id === current._id);

  if (payment) {
    if (payment.completed) {
      return (
        <Tag role="button" color="#0f3f5d">
          Give him certification
        </Tag>
      );
    } else {
      return (
        <Tag
          onClick={() => {
            setCurrentStudentForPayments(student);
            setUpdatePaymentsModel(true);
          }}
          role="button"
          color="#31af98"
        >
          Update payment
        </Tag>
      );
    }
  } else {
    return (
      <Tag
        onClick={() => {
          setAddPaymentsModel(true);
          setCurrentStudentForPayments(student);
        }}
        role="button"
        color="blue"
      >
        Add payment
      </Tag>
    );
  }
};


when i click on add payments 
one enrolled student payment model will opened

and passing this params to the payment model
({batch,
setBatch,
currentStudent,
setCurrentStudent,
addPaymentsModel,
setAddPaymentsModel,})

in payment model we have add payment function 
const addPayments = async (e) => {
  e.preventDefault();
  const updatedEnrolledStudents = batch.enrolledStudents.map((student) => {
    if (student._id === currentStudent._id) {
      return {
        ...student,
        payments: [
          ...student.payments,
          {
            completed,
            amount,
            comment,
            addBy: auth?.user?._id,
            batch: batchId,
          },
        ],
      };
    }
    return student;
  });

  
  setBatch((prevBatch) => ({
    ...prevBatch,
    enrolledStudents: updatedEnrolledStudents,
  }));


  now problem is my list of enrolledStudents is not updateing 
  we should see update payment when i add paymet





