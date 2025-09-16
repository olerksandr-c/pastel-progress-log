import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Plus,
  Calendar,
  MapPin
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Активні роботи",
      value: "12",
      description: "У виконанні",
      icon: Clock,
      color: "text-warning"
    },
    {
      title: "На затвердженні", 
      value: "5",
      description: "Чекають підтвердження",
      icon: AlertTriangle,
      color: "text-primary"
    },
    {
      title: "Завершено сьогодні",
      value: "8",
      description: "Виконані роботи",
      icon: CheckCircle,
      color: "text-success"
    },
    {
      title: "План на тиждень",
      value: "24",
      description: "Заплановані роботи",
      icon: TrendingUp,
      color: "text-accent"
    }
  ];

  const recentWork = [
    {
      id: "W-2024-001",
      title: "Термінова заміна GSM модему",
      location: "ПС 'Киїнка'",
      engineer: "Олексій Коваленко",
      status: "На затвердженні",
      statusColor: "warning",
      date: "16.09.2024"
    },
    {
      id: "W-2024-002", 
      title: "Планове ТО-1",
      location: "РП 'Центральна'",
      engineer: "Марія Іваненко",
      status: "У виконанні",
      statusColor: "primary",
      date: "16.09.2024"
    },
    {
      id: "W-2024-003",
      title: "Заміна акумуляторних батарей",
      location: "ТП-10",
      engineer: "Петро Сидоренко",
      status: "Завершено",
      statusColor: "success",
      date: "15.09.2024"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Головна панель</h1>
          <p className="text-muted-foreground mt-2">
            Огляд поточних робіт та статистики
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Планувати роботу
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Створити наряд
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Work */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Останні роботи</CardTitle>
              <CardDescription>
                Нещодавні наряди на роботу та їх статус
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Переглянути всі
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentWork.map((work) => (
              <div 
                key={work.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {work.title}
                    </h3>
                    <Badge 
                      variant={work.statusColor as any}
                      className="text-xs"
                    >
                      {work.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {work.location}
                    </div>
                    <div>Інженер: {work.engineer}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{work.date}</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">
                    {work.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}