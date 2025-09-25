import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MapPin, 
  Wrench, 
  User, 
  Calendar,
  FileText,
  Edit,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  MessageCircle,
  Paperclip
} from "lucide-react";

interface TaskCardProps {
  task: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskCard({ task, isOpen, onClose }: TaskCardProps) {
  const [comment, setComment] = useState("");
  const [timeline] = useState([
    {
      id: 1,
      type: "status_change",
      author: "Олексій Коваленко",
      action: "змінив статус на У виконанні",
      timestamp: "25.09.2025, 09:15",
      icon: "👤"
    },
    {
      id: 2,
      type: "comment",
      author: "Олексій Коваленко",
      content: "Прибув на об'єкт. Починаю діагностику модема.",
      timestamp: "25.09.2025, 09:16",
      icon: "💬"
    },
    {
      id: 3,
      type: "files",
      author: "Олексій Коваленко",
      action: "додав 2 файли: photo_1.jpg, photo_2.jpg",
      timestamp: "25.09.2025, 14:30",
      icon: "📎"
    },
    {
      id: 4,
      type: "status_change",
      author: "Олексій Коваленко",
      action: "змінив статус на На погодженні",
      timestamp: "25.09.2025, 16:00",
      icon: "👤"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "На розгляді": return "secondary";
      case "Заплановано": return "default";
      case "У виконанні": return "warning";
      case "На погодженні": return "default";
      case "Завершено": return "success";
      case "Відхилено": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "На розгляді": return "bg-muted";
      case "Заплановано": return "bg-blue-50 text-blue-700";
      case "У виконанні": return "bg-yellow-50 text-yellow-700";
      case "На погодженні": return "bg-orange-50 text-orange-700";
      case "Завершено": return "bg-green-50 text-green-700";
      case "Відхилено": return "bg-red-50 text-red-700";
      default: return "bg-muted";
    }
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b border-border">
          {/* 1. Шапка завдання */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold">
                {task.title || "Планове ТО-1: Комплекс ТМ на ПС 'Киїнка'"}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={getStatusColor(task.status)} className={getStatusBgColor(task.status)}>
                  {task.status}
                </Badge>
                <span className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                  {task.id}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 2. Блок основної інформації */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Основна інформація</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Об'єкт */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Об'єкт</div>
                    <div className="font-medium text-primary hover:underline cursor-pointer">
                      {task.location || "ПС 110/35/10 'Городня'"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      м. Городня, вул. Енергетиків, 15
                    </div>
                  </div>
                </div>

                {/* Обладнання */}
                <div className="flex items-start gap-3">
                  <Wrench className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Обладнання</div>
                    <div className="font-medium text-primary hover:underline cursor-pointer">
                      Комплекс ТМ на ПС 110/35/10 "Городня"
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Інв. номер: INV-2024-001
                    </div>
                  </div>
                </div>
              </div>

              {/* Опис завдання */}
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Опис завдання</div>
                  <div className="mt-1 text-sm">
                    {task.description || "Проведення планового технічного обслуговування ТО-1 комплексу телемеханіки. Перевірка всіх компонентів системи, діагностика зв'язку, оновлення програмного забезпечення за необхідності."}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Блок виконання та контролю */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Виконання та контроль</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Виконавець */}
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Виконавець (Інженер)</div>
                    <div className="font-medium">{task.engineer || "Олексій Коваленко"}</div>
                  </div>
                </div>

                {/* Терміни */}
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Терміни</div>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Заплановано на:</span>{" "}
                        <span className="font-medium">{task.scheduledDate || "25.09.2025"}</span>
                      </div>
                      {task.completedDate && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Завершено:</span>{" "}
                          <span className="font-medium">{task.completedDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. Інтерактивний блок (Історія та комунікація) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Історія та комунікація</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Поле для коментаря */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Додати коментар..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1 min-h-[80px]"
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Прикріпити файли
                  </Button>
                  <Button size="sm" disabled={!comment.trim()}>
                    Додати коментар
                  </Button>
                </div>
              </div>

              {/* Стрічка подій */}
              <div className="space-y-3 pt-4 border-t border-border">
                <h4 className="text-sm font-medium">Стрічка подій</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {timeline.map((event) => (
                    <div key={event.id} className="flex gap-3 text-sm">
                      <div className="text-lg">{event.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{event.author}</span>
                          <span className="text-muted-foreground">
                            {event.action || (event.content ? "додав коментар:" : "")}
                          </span>
                        </div>
                        {event.content && (
                          <div className="mt-1 p-2 bg-muted/50 rounded text-sm">
                            "{event.content}"
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          {event.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. Панель дій */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2 justify-between">
                <div className="flex gap-2">
                  {task.status === "Заплановано" && (
                    <Button>
                      <Clock className="h-4 w-4 mr-2" />
                      Взяти в роботу
                    </Button>
                  )}
                  {task.status === "У виконанні" && (
                    <Button>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Надіслати на затвердження
                    </Button>
                  )}
                  {task.status === "На погодженні" && (
                    <>
                      <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Затвердити
                      </Button>
                      <Button variant="destructive">
                        <XCircle className="h-4 w-4 mr-2" />
                        Повернути на доопрацювання
                      </Button>
                    </>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}