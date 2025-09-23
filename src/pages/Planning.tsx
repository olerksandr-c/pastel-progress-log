import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Calendar, 
  Clock, 
  Repeat,
  Settings,
  AlertCircle,
  CheckCircle,
  Wrench,
  Download
} from "lucide-react";

export default function Planning() {
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);

  const maintenanceSchedules = [
    {
      id: 1,
      name: "ТО-1 Комплексів ТМ",
      description: "Щомісячне технічне обслуговування комплексів телемеханіки",
      equipmentType: "Комплекс ТМ",
      frequency: 30,
      nextDate: "2024-10-01",
      equipmentCount: 15,
      status: "active"
    },
    {
      id: 2,
      name: "ТО-2 Комплексів ТМ",
      description: "Щорічне глибоке технічне обслуговування",
      equipmentType: "Комплекс ТМ",
      frequency: 365,
      nextDate: "2024-12-15",
      equipmentCount: 15,
      status: "active"
    },
    {
      id: 3,
      name: "Заміна акумуляторів ББЖ",
      description: "Планова заміна акумуляторних батарей",
      equipmentType: "ББЖ",
      frequency: 730,
      nextDate: "2025-03-20",
      equipmentCount: 25,
      status: "active"
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "ТО-1 ПС 'Киїнка'",
      description: "Планове технічне обслуговування",
      location: "ПС 'Киїнка'",
      scheduledDate: "2024-10-01",
      priority: "medium",
      estimatedDuration: "4 години",
      assignedEngineer: "Олексій Коваленко"
    },
    {
      id: 2,
      title: "ТО-1 РП 'Центральна'",
      description: "Планове технічне обслуговування",
      location: "РП 'Центральна'",
      scheduledDate: "2024-10-02",
      priority: "medium",
      estimatedDuration: "3 години",
      assignedEngineer: "Марія Іваненко"
    },
    {
      id: 3,
      title: "Заміна модему ТП-15",
      description: "Планова заміна GSM модему",
      location: "ТП-15",
      scheduledDate: "2024-09-28",
      priority: "high",
      estimatedDuration: "2 години",
      assignedEngineer: "Петро Сидоренко"
    }
  ];

  const standardJobs = [
    "ТО-1 Комплекс ТМ",
    "ТО-2 Комплекс ТМ",
    "Заміна акумуляторів",
    "Заміна модему",
    "Калібрування датчиків"
  ];

  const equipmentTypes = [
    "Комплекс ТМ",
    "ББЖ",
    "Модем GSM",
    "Контролер",
    "Датчики"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Планування</h1>
          <p className="text-muted-foreground mt-2">
            Управління графіками технічного обслуговування та планування робіт
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Календар
          </Button>
          <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Створити графік
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Створення графіку технічного обслуговування</DialogTitle>
                <DialogDescription>
                  Налаштуйте параметри для автоматичного планування робіт
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Назва графіку</Label>
                    <Input placeholder="Наприклад: ТО-1 Комплексів ТМ" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Тип обладнання</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Виберіть тип" />
                      </SelectTrigger>
                      <SelectContent>
                        {equipmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Шаблон робіт</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Виберіть шаблон" />
                    </SelectTrigger>
                    <SelectContent>
                      {standardJobs.map((job) => (
                        <SelectItem key={job} value={job}>
                          {job}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Періодичність (дні)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Виберіть період" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 днів (щомісячно)</SelectItem>
                        <SelectItem value="90">90 днів (щоквартально)</SelectItem>
                        <SelectItem value="180">180 днів (півріччя)</SelectItem>
                        <SelectItem value="365">365 днів (щорічно)</SelectItem>
                        <SelectItem value="730">730 днів (раз на 2 роки)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Перша дата виконання</Label>
                    <Input type="date" />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                  Скасувати
                </Button>
                <Button onClick={() => setIsScheduleDialogOpen(false)}>
                  Створити графік
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="weekly" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly">Планування робіт на тиждень</TabsTrigger>
          <TabsTrigger value="schedules">Графіки ТО</TabsTrigger>
          <TabsTrigger value="upcoming">Заплановані роботи</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-6">
          {/* Weekly Planning Form */}
          <Card>
            <CardHeader>
              <CardTitle>Формування тижневого плану робіт</CardTitle>
              <CardDescription>
                Виберіть період та сформуйте план робіт на тиждень з завдань "На розгляд"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Початок тижня</Label>
                    <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label>Кінець тижня</Label>
                    <Input type="date" />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button size="sm" className="flex-1">
                    <Plus className="mr-2 h-4 w-4" />
                    Підтягнути завдання "На розгляд"
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setShowImportDialog(true)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Імпорт дефектів
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks Under Review */}
          <Card>
            <CardHeader>
              <CardTitle>Завдання на розгляд</CardTitle>
              <CardDescription>
                Завдання з "Журналу дефектів" та планові роботи для включення до тижневого плану
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    id: "DEF-2024-001",
                    title: "Заміна GSM модему на ПС Киїнка",
                    source: "Журнал дефектів",
                    location: "ПС 'Киїнка'",
                    priority: "Високий"
                  },
                  {
                    id: "TO1-2024-015",
                    title: "ТО-1 на РП Центральна",
                    source: "Планові роботи",
                    location: "РП 'Центральна'",
                    priority: "Середній"
                  },
                  {
                    id: "TO2-2024-003",
                    title: "ТО-2 на ТП-10",
                    source: "Планові роботи",
                    location: "ТП-10",
                    priority: "Низький"
                  }
                ].map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge variant="outline" className="text-xs">{task.source}</Badge>
                        <Badge 
                          variant={task.priority === 'Високий' ? 'destructive' : task.priority === 'Середній' ? 'warning' : 'success'}
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{task.location}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Відхилити</Button>
                      <Button size="sm">Включити до плану</Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Сформувати тижневий план
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedules" className="space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Активні графіки</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">3</div>
                <p className="text-xs text-muted-foreground">Працюють автоматично</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Обслуговується обладнання</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">55</div>
                <p className="text-xs text-muted-foreground">Одиниць в планах</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Наступна робота</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">12</div>
                <p className="text-xs text-muted-foreground">Днів до виконання</p>
              </CardContent>
            </Card>
          </div>

          {/* Schedules List */}
          <div className="space-y-4">
            {maintenanceSchedules.map((schedule) => (
              <Card key={schedule.id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">{schedule.name}</CardTitle>
                        <Badge variant="success" className="text-xs">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Активний
                        </Badge>
                      </div>
                      <CardDescription>{schedule.description}</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Тип обладнання:</span>
                      <div className="font-medium">{schedule.equipmentType}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Періодичність:</span>
                      <div className="font-medium">{schedule.frequency} днів</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Наступна дата:</span>
                      <div className="font-medium">{schedule.nextDate}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Кількість обладнання:</span>
                      <div className="font-medium">{schedule.equipmentCount} одиниць</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Заплановані роботи на найближчі 7 днів</CardTitle>
              <CardDescription>
                Автоматично створені завдання відповідно до графіків ТО
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {task.title}
                          </h3>
                          <Badge 
                            variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'warning' : 'success'}
                            className="text-xs"
                          >
                            {task.priority === 'high' ? 'Високий' : task.priority === 'medium' ? 'Середній' : 'Низький'}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">
                          {task.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Дата:</span>
                            <span className="font-medium">{task.scheduledDate}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Тривалість:</span>
                            <span className="font-medium">{task.estimatedDuration}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Інженер:</span>
                            <span className="font-medium">{task.assignedEngineer}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          Редагувати
                        </Button>
                        <Button size="sm">
                          Призначити
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Import Defects Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Імпорт дефектів</DialogTitle>
            <DialogDescription>
              Буде реалізовано в перспективі
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}