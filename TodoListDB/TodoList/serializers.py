from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    duration = serializers.SerializerMethodField()
    duration_value = serializers.IntegerField(write_only=True)
    duration_unit = serializers.CharField(write_only=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'start_time', 'duration', 'due_time', 'status', 'priority', 'risk', 'effort', 'duration_value', 'duration_unit']

    def get_duration(self, obj):
        return {
            'value': obj.duration_value,
            'unit': obj.duration_unit
        }

    def validate(self, data):
        if 'duration_value' not in data or 'duration_unit' not in data:
            raise serializers.ValidationError("Duration must have both 'value' and 'unit'.")
        if data['duration_unit'] != 'Minutes':
            raise serializers.ValidationError("Currently, only 'Minutes' unit is supported for duration.")
        if int(data['duration_value']) < 0:
            raise serializers.ValidationError("Duration must be a positive value.")
        return data

    def create(self, validated_data):
        validated_data['duration_value'] = validated_data.pop('duration_value')
        validated_data['duration_unit'] = validated_data.pop('duration_unit')
        return super().create(validated_data)

    def update(self, instance, validated_data):
        instance.duration_value = validated_data.pop('duration_value', instance.duration_value)
        instance.duration_unit = validated_data.pop('duration_unit', instance.duration_unit)
        return super().update(instance, validated_data)
