import { useState, useEffect } from 'react'
import { ApiService } from '../services/apiService'
import { Log } from '../types/logTypes'
import LogTable from './LogTable'

type DashboardProps = {
  email: string
  password: string
}

function Dashboard({ email, password }: DashboardProps) {
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    async function fetchLogs() {
      const res = await ApiService.getLogs({ email, password })
      setLogs(
        res.data.map((log: any) => {
          const bestAppointmentFound =
            'bestAppointmentFound' in log ? new Date(log.bestAppointmentFound) : null

          return {
            email: log.email,
            date: new Date(log.date),
            currentAppointment: new Date(log.currentAppointment),
            bestAppointmentFound,
          }
        }),
      )
    }
    try {
      fetchLogs()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div>
      <h1 className="text-xl py-4">Log history</h1>
      <LogTable logs={logs} />
    </div>
  )
}

export default Dashboard
