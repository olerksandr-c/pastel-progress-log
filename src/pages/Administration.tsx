import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Users,
  Settings,
  Shield,
  Database,
  BookOpen,
  Trash2,
  Edit,
  UserCheck
} from "lucide-react";

export default function Administration() {
  const users = [
    {
      id: 1,
      name: "Іван Петренко",
      email: "ivan.petrenko@company.ua",
      role: "Менеджер",
      department: "Технічна служба",
      status: "active",
      lastLogin: "2024-09-16 09:30"
    },
    {
      id: 2,
      name: "Олексій Коваленко",
      email: "oleksiy.kovalenko@company.ua",
      role: "Інженер",
      department: "Технічна служба",
      status: "active",
      lastLogin: "2024-09-16 08:15"
    },
    {
      id: 3,
      name: "Марія Іваненко",
      email: "maria.ivanenko@company.ua",
      role: "Інженер",
      department: "Технічна служба",
      status: "active",
      lastLogin: "2024-09-15 16:45"
    },
    {
      id: 4,
      name: "Петро Сидоренко",
      email: "petro.sydorenko@company.ua",
      role: "Інженер",
      department: "Технічна служба",
      status: "inactive",
      lastLogin: "2024-09-10 12:20"
    }
  ];

  const directories = [
    {
      id: 1,
      name: "Підрозділи",
      description: "Організаційна структура компанії",
      recordsCount: 15,
      lastUpdated: "2024-09-10"
    },
    {
      id: 2,
      name: "Типи компонентів",
      description: "Довідник типів обладнання та компонентів",
      recordsCount: 45,
      lastUpdated: "2024-09-15"
    },
    {
      id: 3,
      name: "Типи об'єктів",
      description: "Довідник типів об'єктів (ПС, РП, ТП, СП)",
      recordsCount: 4,
      lastUpdated: "2024-09-16"
    },
    {
      id: 4,
      name: "Шаблони робіт",
      description: "Стандартні регламентні роботи",
      recordsCount: 12,
      lastUpdated: "2024-09-12"
    },
    {
      id: 5,
      name: "Запчастини",
      description: "Довідник запасних частин та матеріалів",
      recordsCount: 156,
      lastUpdated: "2024-09-14"
    }
  ];

  const systemStats = [
    {
      name: "Загальна кількість користувачів",
      value: "24",
      description: "Активних: 22, Неактивних: 2"
    },
    {
      name: "Об'єкти в системі",
      value: "47",
      description: "З обладнанням: 45, Порожні: 2"
    },
    {
      name: "Одиниці обладнання",
      value: "156",
      description: "Активні: 142, На ТО: 14"
    },
    {
      name: "Записів в журналі",
      value: "1,247",
      description: "За останній місяць: 89"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Адміністрування</h1>
          <p className="text-muted-foreground mt-2">
            Управління користувачами, довідниками та налаштуваннями системи
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Database className="mr-2 h-4 w-4" />
            Резервна копія
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Налаштування
          </Button>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Користувачі</TabsTrigger>
          <TabsTrigger value="directories">Довідники</TabsTrigger>
          <TabsTrigger value="roles">Ролі та права</TabsTrigger>
          <TabsTrigger value="system">Система</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* User Management */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Пошук користувачів..."
                  className="pl-10 w-80"
                />
              </div>
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Додати користувача
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Користувачі системи</CardTitle>
              <CardDescription>
                Управління обліковими записами та правами доступу
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground">{user.name}</h3>
                          <Badge
                            variant={user.status === 'active' ? 'success' : 'secondary'}
                            className="text-xs"
                          >
                            {user.status === 'active' ? 'Активний' : 'Неактивний'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.email} • {user.role} • {user.department}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Остання активність: {user.lastLogin}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="directories" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Довідники системи</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {directories.map((directory) => (
              <Card key={directory.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{directory.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {directory.description}
                      </CardDescription>
                    </div>
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div>
                      <span className="text-muted-foreground">Записів: </span>
                      <span className="font-medium">{directory.recordsCount}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Оновлено: </span>
                      <span className="font-medium">{directory.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Example Records */}

                  {/* {directory.id === 1 && (
                    <div className="space-y-2 mb-4 p-3 bg-muted/30 rounded-lg">
                      <div className="text-xs font-medium text-muted-foreground uppercase">Приклад записів:</div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Ніжинський РЕМ</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex justify-between">
                          <span>Прилуцький РЕМ</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex justify-between">
                          <span>Бахмацька дільниця</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        <Plus className="mr-2 h-3 w-3" />
                        Додати підрозділ
                      </Button>
                    </div>
                  )} */}

                  {/* {directory.id === 2 && (
                    <div className="space-y-2 mb-4 p-3 bg-muted/30 rounded-lg">
                      <div className="text-xs font-medium text-muted-foreground uppercase">Приклад записів:</div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Комплекс ТМ</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex justify-between">
                          <span>ББЖ</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex justify-between">
                          <span>Модем GSM</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        <Plus className="mr-2 h-3 w-3" />
                        Додати тип компонента
                      </Button>
                    </div>
                  )} */}

                  {/* {directory.id === 3 && (
                    <div className="space-y-2 mb-4 p-3 bg-muted/30 rounded-lg">
                      <div className="text-xs font-medium text-muted-foreground uppercase">Приклад записів:</div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>ПС (Підстанція)</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex justify-between">
                          <span>РП (Розподільний пункт)</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex justify-between">
                          <span>ТП (Трансформаторний пункт)</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        <Plus className="mr-2 h-3 w-3" />
                        Додати тип об'єкта
                      </Button>
                    </div>
                  )} */}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-2 h-4 w-4" />
                      Редагувати
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ролі та права доступу</CardTitle>
              <CardDescription>
                Налаштування прав доступу для різних ролей користувачів
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-2 border-primary/20">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Адміністратор</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Повний доступ до всіх функцій системи
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-success" />
                          <span>Управління користувачами</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-success" />
                          <span>Налаштування системи</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-success" />
                          <span>Всі модулі</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-accent" />
                        <CardTitle className="text-lg">Менеджер</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Управління роботами та планування
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-success" />
                          <span>Журнал робіт</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-success" />
                          <span>Планування</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-success" />
                          <span>Затвердження робіт</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-secondary" />
                        <CardTitle className="text-lg">Інженер</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Виконання робіт та ведення обліку
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-success" />
                          <span>Мої завдання</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-success" />
                          <span>Звітність</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-muted-foreground" />
                          <span>Тільки перегляд</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">Перегляд</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Тільки перегляд даних системи
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-success" />
                          <span>Перегляд об'єктів</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-success" />
                          <span>Перегляд обладнання</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-success" />
                          <span>Перегляд звітів</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          {/* System Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </CardTitle>
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

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Системні налаштування</CardTitle>
              <CardDescription>
                Основні параметри конфігурації системи
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="system-name">Назва системи</Label>
                    <Input id="system-name" defaultValue="E-Works Journal" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Часовий пояс</Label>
                    <Input id="timezone" defaultValue="Europe/Kiev" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Періодичність резервування</Label>
                    <Input id="backup-frequency" defaultValue="Щоденно о 02:00" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Таймаут сесії (хвилини)</Label>
                    <Input id="session-timeout" type="number" defaultValue="480" />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Скасувати</Button>
                  <Button>Зберегти налаштування</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}