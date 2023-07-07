import { CusResponse } from '@/api/fake'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Input, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useWindowInfo } from '@/hooks/useHook'
import DropdownButton from '@/components/buttons/DropdownButton'
import { TableProps } from 'antd/lib/table/InternalTable'
import ExtendedButton from '@/components/buttons/ExtendedButton'
import type {
  FilterDropdownProps,
  SortOrder,
  SorterResult,
} from 'antd/lib/table/interface'
import type { ColumnsType } from 'antd/es/table'
import MyCard from '../../components/MyCard'
import { SearchOutlined } from '@ant-design/icons'
import FilterLayout from './components/FilterLayout'
import { AnyObject } from '@/types'
import Wrapper from '@/components/Wrapper'
import { useMessage } from './layout'
import Image from '@/components/Image'
export interface DataChangeInfoType extends AnyObject {
  page: number
  size: number
  sort?: 'age'
  order?: SortOrder
}

const Home = () => {
  const [dataChangeInfo, setDataChangeInfo] = useState<DataChangeInfoType>({
    page: 1,
    size: 10,
  })
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  // const { status, error, data } = useQuery({
  //   queryKey: ['table', { dataChangeInfo }],
  //   keepPreviousData: true,
  //   queryFn: () => fakePost(dataChangeInfo),
  // })
  const queryClient = useQueryClient()
  // const deleteMutation = useMutation({
  //   mutationFn: fakeDelete,
  //   onSuccess: (data) => {
  //     queryClient.setQueryData(['table', data], data)
  //     queryClient.invalidateQueries(['id'], { exact: true })
  //   },
  // })

  const { windowHeight } = useWindowInfo()
  const navigate = useNavigate()
  const toast = useMessage()

  const handleChange: TableProps<CusResponse>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    const { current = 0, pageSize = 10 } = pagination
    const singleSorter = sorter as SorterResult<CusResponse>
    const { columnKey, order } = singleSorter
    const { action } = extra
    // console.log(filters)
    const actions = new Map([
      ['paginate', () => setDataChangeInfo({ page: current, size: pageSize })],
      [
        'sort',
        () => {
          if (columnKey !== undefined && columnKey !== null) {
            setDataChangeInfo((prev) => {
              const newState = { ...prev }
              newState.sort = columnKey as 'age'
              newState.order = order
              return newState
            })
          }
        },
      ],
      [
        'filter',
        () => {
          Object.keys(filters).forEach((key) => {
            if (Array.isArray(filters[key]) && filters[key] !== null) {
              const obj = { [key]: filters[key]?.join() }
              setDataChangeInfo((prev) => ({ ...prev, ...obj }))
            }
          })
        },
      ],
    ])
    const doSomething = actions.get(action) || (() => console.log('no action'))
    doSomething?.call(this)
  }

  const columns: ColumnsType<CusResponse> = [
    {
      title: '姓名',
      width: 50,
      dataIndex: 'cus_name',
      key: 'cus_name',
      fixed: 'left',
      filterDropdown: (props: FilterDropdownProps) => {
        const { selectedKeys, setSelectedKeys, confirm, clearFilters } = props
        const handleReset = () => {
          clearFilters?.() // 清空篩選條件，加上 Optional Chaining
          confirm({ closeDropdown: true }) // 關閉下拉框
          setDataChangeInfo({ page: 1, size: 10 })
        }
        return (
          <div className="p-2">
            <Input
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => confirm()}
              value={selectedKeys[0]}
            />
            <div className="mt-2 flex justify-around gap-2">
              <ExtendedButton
                type="primary"
                icon={<SearchOutlined />}
                onClick={() => confirm()}
              >
                搜尋
              </ExtendedButton>
              <ExtendedButton onClick={handleReset}>重置</ExtendedButton>
              <ExtendedButton
                danger
                onClick={() => confirm({ closeDropdown: true })}
              >
                取消
              </ExtendedButton>
            </div>
          </div>
        )
      },
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
    },
    {
      title: '電話',
      width: 150,
      dataIndex: 'cus_number',
      key: 'cus_number',
    },
    {
      title: 'Email',
      width: 70,
      dataIndex: 'cus_email',
      key: 'cus_email',
      sorter: true,
    },
    {
      title: '身分證字號',
      dataIndex: 'cus_idnumber',
      key: 'cus_idnumber',
      width: 150,
    },
    {
      title: '大頭照',
      key: 'cus_avatar',
      width: 100,
      render: (_, props) => {
        return <Image src={props.cus_avatar} />
      },
    },
    {
      title: '性別',
      dataIndex: 'sex',
      key: 'sex',
      width: 150,
    },
    {
      title: '表情符號',
      dataIndex: 'emoji',
      key: 'emoji',
      width: 70,
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 60,
      render: (_, props) => {
        return (
          <DropdownButton>
            <ExtendedButton
              onClick={() => {
                navigate(`/antd/${props.cus_name}`)
              }}
              type="primary"
            >
              編輯
            </ExtendedButton>
            <ExtendedButton
              onClick={() => {
                console.log('查看')
                toast.success('success')
              }}
              type="info"
            >
              查看
            </ExtendedButton>
            <ExtendedButton
              onClick={() => {
                console.log(props)
              }}
              type="primary"
              danger
            >
              刪除
            </ExtendedButton>
            {/* <Popconfirm
              title="是否刪除"
              description="Are you sure to delete this task?"
              placement="left"
              onConfirm={() => {
                console.log(props)
                fakeDelete().then((res) => {
                  console.log(res)
                })
              }}
              onCancel={() => {
                toast.error('取消刪除')
              }}
              okText="Yes"
              cancelText="No"
            ></Popconfirm> */}
          </DropdownButton>
        )
      },
    },
  ]

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: CusResponse[]) => {
      setSelectedKeys(selectedRowKeys)
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   'selectedRows: ',
      //   selectedRows
      // )
    },
    getCheckboxProps: (record: CusResponse) => ({
      disabled: record.cus_name.includes('S'),
      name: record.cus_name,
    }),
  }

  // if (error) alert(error)
  return (
    <Wrapper>
      <MyCard>
        <FilterLayout setDataChangeInfo={setDataChangeInfo} />
        <div className=" flex justify-end gap-2">
          <ExtendedButton
            type="primary"
            danger
            onClick={() => {
              console.log(selectedKeys)
              toast.info(selectedKeys)
            }}
          >
            刪除
          </ExtendedButton>
          <ExtendedButton
            type="primary"
            onClick={() => {
              navigate('/antd/create')
            }}
          >
            新增
          </ExtendedButton>
        </div>
        {/* <Table
          size="small"
          onChange={handleChange}
          columns={columns}
          dataSource={data?.data?.data || []}
          scroll={{ x: 1500, y: windowHeight - 200 }}
          bordered
          loading={status === 'loading'}
          pagination={{
            position: ['bottomCenter'],
            pageSize: dataChangeInfo?.size || 10,
            total: data?.data?.total || 0,
            current: dataChangeInfo?.page || 1,
          }}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
        /> */}
      </MyCard>
    </Wrapper>
  )
}

export default Home
